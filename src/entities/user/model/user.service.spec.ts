import { TestBed } from '@angular/core/testing';
import { UserApiService } from '../api/user-api.service';

import { UserService } from './user.service';

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserApiService, useValue: {} }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
