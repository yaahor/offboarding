import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardingDialogComponent } from './offboarding-dialog.component';

describe('OffboardingDialogComponent', () => {
  let component: OffboardingDialogComponent;
  let fixture: ComponentFixture<OffboardingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffboardingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
