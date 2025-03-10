import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../entities/user/model/user.service';
import { OffboardingData } from '../../entities/user/model/offboarding-data';
import { OffboardingState } from '../../entities/user/model/offboarding.state';

@Injectable({
  providedIn: 'root',
})
export class OffboardingDialogService {
  constructor(private readonly userService: UserService) {}

  conductOffboarding(
    userId: string,
    data: OffboardingData,
  ): Observable<OffboardingState> {
    return this.userService.conductOffboarding(userId, data);
  }
}
