import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatestWith, delay, map, Observable, of, startWith } from 'rxjs';
import { Status } from '../../shared/model/status';
import { User } from '../../shared/model/user';
import { UserStatus } from '../../shared/model/user-status';
import { OffboardingVo } from './model/offboarding.vo';
import { UserListState } from './model/user-list.state';

const mockUsers: User[] = [
  {
    id: 'vvv1323',
    name: 'John Doe',
    department: 'Engineering',
    status: UserStatus.ACTIVE,
    email: 'some.email@wp.pl',
    equipments: [
      {
        id: 'aaa123456',
        name: 'Macbook air'
      }, {
        id: 'aaa123457',
        name: 'Magic Mouse'
      }
    ],
  },
  {
    id: 'vvv1324',
    name: 'Richard M. Gallegos',
    department: 'Engineering',
    status: UserStatus.OFFBOARDED,
    email: 'some.email@wp.pl',
    equipments: [
      {
        id: 'aaa123458',
        name: 'Macbook air'
      }, {
        id: 'aaa123458',
        name: 'Magic Mouse'
      }
    ],
  }
];

@Injectable({
  providedIn: 'root'
})
export class OffboardingService {
  private readonly state$ = new BehaviorSubject<{ search: string }>({ search: '' });
  private userListState$?: Observable<UserListState>;

  constructor() { }

  getVo(): Observable<OffboardingVo> {
    return this.state$
      .pipe(
        combineLatestWith(this.getUserList()),
        map(([state, userListState]) => {
          if (userListState.status !== Status.SUCCESS) {
            return userListState;
          }

          // todo implement search by other properties
          const users = mockUsers.filter(user => user.name.toLowerCase().includes(state.search.toLowerCase()));

          return { status: Status.SUCCESS, users };
        }),
      );
  }

  filterUsers(search: string): void {
    // Retrieve the current state
    const state = this.state$.getValue();

    if (state.search === search) {
      return; // Skip state update if the value hasn't changed
    }

    // Update the state with the new search value
    return this.state$.next({ ...state, search })
  }

  /**
   * Retrieves the list of users.
   */
  private getUserList(): Observable<UserListState> {
    // If userListState$ is already initialized, return it to avoid creating multiple streams
    if (this.userListState$) {
      return this.userListState$;
    }

    // Create a new stream that emits the user list with a delay and a loading state
    return this.userListState$ = of({ items: mockUsers, status: Status.SUCCESS })
      .pipe(
        delay(2000),
        startWith<UserListState>({ status: Status.LOADING })
      );
  }
}
