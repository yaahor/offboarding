import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../entities/user/model/user.service';
import { EmployeeDetailsVo } from './model/employee-details.vo';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {
  constructor(private readonly userService: UserService) {}

  getVo(id: string): Observable<EmployeeDetailsVo> {
    return this.userService.getUser(id);
  }
}
