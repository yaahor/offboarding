import { TestBed } from '@angular/core/testing';

import { OffboardingService } from './offboarding.service';

describe(OffboardingService.name, () => {
  let service: OffboardingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffboardingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
