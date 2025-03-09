import { Injectable } from '@angular/core';
import { Sort as MaterialSort } from '@angular/material/sort';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { UserService } from '../../entities/user/model/user.service';
import { Status } from '../../shared/model/status';
import { sortUsers } from './lib/sort-users';
import { DashboardVo } from './model/dashboard.vo';
import { Sort } from './model/sort';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly state$ = new BehaviorSubject<{ search: string, sort?: Sort }>({ search: '' });

  constructor(private readonly userService: UserService) { }

  getVo(): Observable<DashboardVo> {
    return this.state$
      .pipe(
        combineLatestWith(this.userService.getUsers()),
        map(([state, userListState]): DashboardVo => {
          if (userListState.status !== Status.SUCCESS) {
            return { userList: userListState };
          }

          const users = userListState.items.filter(user => {
            const lowerSearch = state.search.toLocaleLowerCase();

            return user.name.toLocaleLowerCase().includes(lowerSearch) ||
              user.department.toLocaleLowerCase().toLocaleLowerCase(lowerSearch);
          });

          if (state.sort) {
            sortUsers(users, state.sort);
          }

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

  sortUsers(sort: MaterialSort): void {
    // Retrieve the current state
    const state = this.state$.getValue();

    if (state.sort?.active === sort.active && state.sort?.direction === sort.direction) {
      return; // Skip state update if the value hasn't changed
    }

    // Update the state with the new sort value
    this.state$.next({ ...this.state$.getValue(), sort: sort as Sort });
  }
}
