import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from '../pages/employee-details/employee-details.component';
import { OffboardingComponent } from '../pages/offboarding/offboarding.component';
import { RouteParam } from '../shared/model/route-param';

export const routes: Routes = [
  {
    path: '',
    component: OffboardingComponent,
  },
  {
    path: `:${RouteParam.EMPLOYEE_ID}`,
    component: EmployeeDetailsComponent,
  },
  { path: '**', redirectTo: '', }
];
