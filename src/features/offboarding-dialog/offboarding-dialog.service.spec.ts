import { TestBed } from '@angular/core/testing';
import { OffboardingDialogService } from './offboarding-dialog.service';

describe(OffboardingDialogService.name, () => {
  let service: OffboardingDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffboardingDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
