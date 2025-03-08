import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { mockUsers } from './mock-users';
import { UserDto } from './user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  /**
   * Retrieves a list of users.
   */
  getUsers(): Observable<UserDto[]> {
    return of(mockUsers).pipe(
      delay(2000),
    );
  }
}
