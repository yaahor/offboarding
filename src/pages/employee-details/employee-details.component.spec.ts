import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EmployeeDetailsComponent } from './employee-details.component';
import { EmployeeDetailsService } from './employee-details.service';

describe(EmployeeDetailsComponent.name, () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsComponent],
      providers: [
        provideRouter([]),
        { provide: EmployeeDetailsService, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
