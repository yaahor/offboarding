import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Status } from '../../shared/model/status';
import { OffboardingService } from './offboarding.service';
import { OffboardingVo } from './model/offboarding.vo';
import { EquipmentListPipe } from './ui/equipment-list.pipe';
import { StatusPipe } from './ui/status.pipe';

@Component({
  selector: 'app-offboarding',
  imports: [
    MatProgressSpinnerModule, CommonModule, MatFormFieldModule, MatInputModule, EquipmentListPipe, StatusPipe,
    ReactiveFormsModule,
  ],
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
  protected searchControl = new FormControl();
  private readonly destroyRef = inject(DestroyRef);

  constructor(private service: OffboardingService) {
  }

  ngOnInit(): void {
    this.vo$ = this.service.getVo();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(search => this.service.filterUsers(search));
  }
}
