import { Routes } from '@angular/router';
import { OffboardingComponent } from '../pages/offboarding/offboarding.component';

export const routes: Routes = [
  {
    path: '',
    component: OffboardingComponent,
  },
  { path: '**', redirectTo: '', }
];
