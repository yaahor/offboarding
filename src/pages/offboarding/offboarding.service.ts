import { Injectable } from '@angular/core';
import { delay, Observable, of, startWith } from 'rxjs';
import { Status } from '../../shared/model/status';
import { User } from '../../shared/model/user';
import { UserStatus } from '../../shared/model/user-status';
import { OffboardingLoadingVo, OffboardingVo } from './model/offboarding.vo';

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

  constructor() { }

  getVo(): Observable<OffboardingVo> {
    return of({
      status: Status.SUCCESS,
      users: mockUsers,
    })
      .pipe(
        delay(2000),
        startWith<OffboardingVo>({ status: Status.LOADING }),
      );
  }

  filterUsers(search: string): void {
    // todo implement
  }
}
