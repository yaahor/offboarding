import { TestBed } from '@angular/core/testing';
import { UserService } from '../../entities/user/model/user.service';

import { DashboardService } from './dashboard.service';

describe(DashboardService.name, () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: {} }],
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
