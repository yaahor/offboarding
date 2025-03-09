import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, startWith } from 'rxjs';
import { Status } from '../../../shared/model/status';
import { UserApiService } from '../api/user-api.service';
import { mapDtoToUser } from './map-dto-to-user';
import { UserListState } from './user-list.state';
import { UserState } from './user.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListState$?: Observable<UserListState>;

  constructor(private readonly userApiService: UserApiService) {}

  getUsers(): Observable<UserListState> {
    if (this.userListState$) {
      return this.userListState$;
    }

    return this.userListState$ = this.userApiService.getUsers()
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
}
