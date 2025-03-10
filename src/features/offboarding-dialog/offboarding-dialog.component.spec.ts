import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { OffboardingDialogComponent } from './offboarding-dialog.component';
import { OffboardingDialogService } from './offboarding-dialog.service';

describe(OffboardingDialogComponent.name, () => {
  let component: OffboardingDialogComponent;
  let fixture: ComponentFixture<OffboardingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffboardingDialogComponent],
      providers: [
        { provide: OffboardingDialogService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
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
