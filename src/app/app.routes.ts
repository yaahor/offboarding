import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from '../pages/employee-details/employee-details.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { RouteParam } from '../shared/model/route-param';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: `:${RouteParam.EMPLOYEE_ID}`,
    component: EmployeeDetailsComponent,
  },
  { path: '**', redirectTo: '', }
];
