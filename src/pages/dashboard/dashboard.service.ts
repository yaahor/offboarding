import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { UserService } from '../../entities/user/model/user.service';
import { Status } from '../../shared/model/status';
import { DashboardVo } from './model/dashboard.vo';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly state$ = new BehaviorSubject<{ search: string }>({
    search: '',
  });

  constructor(private readonly userService: UserService) {}

  getVo(): Observable<DashboardVo> {
    return this.state$.pipe(
      combineLatestWith(this.userService.getUsers()),
      map(([state, userListState]): DashboardVo => {
        if (userListState.status !== Status.SUCCESS) {
          return { userList: userListState };
        }

        const users = userListState.items.filter((user) => {
          const lowerSearch = state.search.toLowerCase();

          return (
            user.name.toLowerCase().includes(lowerSearch) ||
            user.department.toLowerCase().includes(lowerSearch)
          );
        });

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
    return this.state$.next({ ...state, search });
  }
}
