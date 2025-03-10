import { TestBed } from '@angular/core/testing';
import { UserService } from '../../entities/user/model/user.service';

import { EmployeeDetailsService } from './employee-details.service';

describe(EmployeeDetailsService.name, () => {
  let service: EmployeeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: {} }],
    });
    service = TestBed.inject(EmployeeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
