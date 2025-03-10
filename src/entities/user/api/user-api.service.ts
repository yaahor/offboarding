import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mockServerPort } from '../../../shared/config/mock-server-port';
import { OnboardingDto } from './onboarding.dto';
import { UserDto } from './user.dto';

const apiUrl = `http://localhost:${mockServerPort}`;

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private readonly httpClient: HttpClient) {
  }

  /**
   * Retrieves a list of users.
   */
  getUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${apiUrl}/employees`);
  }

  /**
   * Retrieves a user by its id.
   */
  getUser(id: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${apiUrl}/employees/${id}`);
  }

  conductOffboarding(userId: string, dto: OnboardingDto): Observable<void> {
    return this.httpClient.post<void>(`${apiUrl}/users/${userId}/offboard`, dto);
  }
}
