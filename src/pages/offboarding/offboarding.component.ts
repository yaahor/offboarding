import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OffboardingService } from './offboarding.service';
import { OffboardingVo } from './model/offboarding.vo';

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
export class OffboardingComponent implements OnInit {
  protected vo$?: Observable<OffboardingVo>;

  constructor(private service: OffboardingService) {

  }

  ngOnInit(): void {
    this.vo$ = this.service.getVo();
  }
}
