import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { Status } from '../../shared/model/status';
import { OffboardingService } from './offboarding.service';
import { OffboardingVo } from './model/offboarding.vo';

@Component({
  selector: 'app-offboarding',
  imports: [MatProgressSpinnerModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './offboarding.component.html',
  styleUrl: './offboarding.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-onboarding'
  }
})
export class OffboardingComponent implements OnInit {
  protected vo$?: Observable<OffboardingVo>;
  protected readonly Status = Status;

  constructor(private service: OffboardingService) {

  }

  ngOnInit(): void {
    this.vo$ = this.service.getVo();
  }
}
