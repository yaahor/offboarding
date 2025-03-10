import { TestBed } from '@angular/core/testing';
import { UserService } from '../../entities/user/model/user.service';
import { OffboardingDialogService } from './offboarding-dialog.service';

describe(OffboardingDialogService.name, () => {
  let service: OffboardingDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: {} }],
    });
    service = TestBed.inject(OffboardingDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
