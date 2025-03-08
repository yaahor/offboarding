import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { UserService } from '../../entities/user/model/user.service';
import { Status } from '../../shared/model/status';
import { OffboardingVo } from './model/offboarding.vo';

@Injectable({
  providedIn: 'root'
})
export class OffboardingService {
  private readonly state$ = new BehaviorSubject<{ search: string }>({ search: '' });

  constructor(private readonly userService: UserService) { }

  getVo(): Observable<OffboardingVo> {
    return this.state$
      .pipe(
        combineLatestWith(this.userService.getUsers()),
        map(([state, userListState]): OffboardingVo => {
          if (userListState.status !== Status.SUCCESS) {
            return { userList: userListState };
          }

          const users = userListState.items.filter(user => user.searchable.includes(state.search.toLowerCase()));

          return { userList: { status: Status.SUCCESS, items: users } };
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
}
