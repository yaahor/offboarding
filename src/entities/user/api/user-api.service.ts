import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
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
    return of(mockUsers).pipe(delay(2000),);
  }

  /**
   * Retrieves a user by its id.
   */
  getUser(id: string): Observable<UserDto> {
    const user = mockUsers.find(user => user.id === id);

    if (!user) {
      return throwError(() => new Error('User not found'));
    }

    return of(user).pipe(delay(2000));
  }
}
