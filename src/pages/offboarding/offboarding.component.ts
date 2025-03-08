import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-offboarding',
  imports: [],
  templateUrl: './offboarding.component.html',
  styleUrl: './offboarding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-onboarding'
  }
})
export class OffboardingComponent {

}
