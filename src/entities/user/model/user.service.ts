import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  startWith,
  tap,
} from 'rxjs';
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
  providedIn: 'root',
})
export class UserService {
  private readonly userListState$ = new BehaviorSubject<
    UserListState | undefined
  >(undefined);

  constructor(private readonly userApiService: UserApiService) {}

  /**
   * Retrieves the user list state from the store.
   * If not loaded, it triggers the method to fetch the data from the API.
   *
   * @returns An observable of the user list state.
   */
  getUsers(): Observable<UserListState> {
    // Fetch the data if the user list state is not already loaded
    if (!this.userListState$.value) {
      this._getUsers();
    }

    return this.userListState$.pipe(
      // Filter out undefined values
      filter((state): state is UserListState => !!state),
    );
  }

  /**
   * Retrieves a user by its ID.
   * The store is not used to guarantee that the data is up to date.
   * @param id The ID of the user to retrieve.
   * @returns An observable of the user state.
   */
  getUser(id: string): Observable<UserState> {
    return this.userApiService.getUser(id).pipe(
      map((dto) => {
        const user = mapDtoToUser(dto);

        // Return success state
        return { status: Status.SUCCESS, user };
      }),
      catchError((): Observable<UserState> => {
        // Return error state
        return of({ status: Status.ERROR });
      }),
      // Start with loading state
      startWith<UserState>({ status: Status.LOADING }),
    );
  }

  /**
   * Initiates the offboarding process for a user.
   * Updates the user's status to "OFFBOARDED" upon success.
   *
   * @param userId The ID of the user being offboarded.
   * @param data The offboarding data to be processed.
   * @returns An observable of the offboarding state.
   */
  conductOffboarding(
    userId: string,
    data: OffboardingData,
  ): Observable<OffboardingState> {
    const dto = mapOffboardingDataToDto(data);

    return this.userApiService.conductOffboarding(userId, dto).pipe(
      tap(() => {
        // Update user status
        this.updateUserStatus(userId, UserStatus.OFFBOARDED);
      }),
      map((): OffboardingState => {
        // Return success state
        return { status: Status.SUCCESS };
      }),
      catchError((): Observable<OffboardingState> => {
        // Return error state
        return of({ status: Status.ERROR });
      }),
      // Start with loading state
      startWith<OffboardingState>({ status: Status.LOADING }),
    );
  }

  /**
   * Fetches the list of users from the API and updates the store.
   */
  private _getUsers(): void {
    this.userApiService
      .getUsers()
      .pipe(
        map((DTOs) => {
          // Map DTOs to users
          const users = DTOs.map(mapDtoToUser);
          // Return success state with users
          return { status: Status.SUCCESS, items: users };
        }),
        catchError((): Observable<UserListState> => {
          // Return error state
          return of({ status: Status.ERROR });
        }),
        // Start with loading state
        startWith<UserListState>({ status: Status.LOADING }),
      )
      .subscribe((state) => {
        // Update user list state
        this.userListState$.next(state);
      });
  }

  /**
   * Updates the status of a user in the user list.
   *
   * @param userId The ID of the user whose status is to be updated.
   * @param status The new status to be set for the user.
   */
  private updateUserStatus(userId: string, status: UserStatus): void {
    // Get current user list state
    const userListState = this.userListState$.value;

    // Check if user list state exists and has success status
    if (!userListState || !isUserListSuccessState(userListState)) {
      return;
    }

    // Update users
    const users = userListState.items.map((user) => {
      if (user.id === userId) {
        return { ...user, status };
      }

      return user;
    });

    // Update user list state
    this.userListState$.next({ status: Status.SUCCESS, items: users });
  }
}
