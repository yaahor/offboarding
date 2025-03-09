import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, of, startWith, tap } from 'rxjs';
import { Status } from '../../../shared/model/status';
import { UserApiService } from '../api/user-api.service';
import { isUserListSuccessState } from './is-user-list-success-state';
import { mapDtoToUser } from './map-dto-to-user';
import { mapOffboardingDataToDto } from './map-offboarding-data-to-dto';
import { OffboardingData } from './offboarding-data';
import { OffboardingState } from './offboarding.state';
import { UserListState } from './user-list.state';
import { UserStatus } from './user-status';
import { UserState } from './user.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userListState$ = new BehaviorSubject<UserListState | undefined>(undefined);

  constructor(private readonly userApiService: UserApiService) {}

  getUsers(): Observable<UserListState> {
    if (!this.userListState$.value) {
      this._getUsers().subscribe(state => {
        this.userListState$.next(state);
      })
    }

    return this.userListState$
      .pipe(
        filter((state): state is UserListState => !!state),
      );
  }

  getUser(id: string): Observable<UserState> {
    return this.userApiService.getUser(id)
      .pipe(
        map((dto) => {
          const user = mapDtoToUser(dto);
          return { status: Status.SUCCESS, user };
        }),
        catchError((): Observable<UserState> => {
          return of({ status: Status.ERROR });
        }),
        startWith<UserState>({ status: Status.LOADING }),
      )
  }

  conductOffboarding(userId: string, data: OffboardingData): Observable<OffboardingState> {
    const dto = mapOffboardingDataToDto(data);

    return this.userApiService.conductOffboarding(userId, dto)
      .pipe(
        tap(() => {
          this.updateUserStatus(userId, UserStatus.OFFBOARDED);
        }),
        map((): OffboardingState => {
          return { status: Status.SUCCESS };
        }),
        catchError((): Observable<OffboardingState> => {
          return of({ status: Status.ERROR });
        }),
        startWith<OffboardingState>({ status: Status.LOADING }),
      );
  }

  private _getUsers(): Observable<UserListState> {
    return this.userApiService.getUsers()
      .pipe(
        map((DTOs) => {
          const users = DTOs.map(mapDtoToUser);
          return { status: Status.SUCCESS, items: users };
        }),
        catchError((): Observable<UserListState> => {
          return of({ status: Status.ERROR });
        }),
        startWith<UserListState>({ status: Status.LOADING }),
      );
  }

  private updateUserStatus(userId: string, status: UserStatus): void {
    const userListState = this.userListState$.value;

    if (!userListState || !isUserListSuccessState(userListState)) {
      return;
    }

    const users = userListState.items.map(user => {
      if (user.id === userId) {
        return { ...user, status };
      }

      return user;
    });

    this.userListState$.next({ status: Status.SUCCESS, items: users });
  }
}
