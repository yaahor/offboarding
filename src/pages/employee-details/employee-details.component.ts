import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Equipment } from '../../entities/user/model/equipment';
import { UserStatus } from '../../entities/user/model/user-status';
import { OffboardingDialogComponent } from '../../features/offboarding-dialog/offboarding-dialog.component';
import { RouteParam } from '../../shared/model/route-param';
import { Status } from '../../shared/model/status';
import { EmployeeDetailsService } from './employee-details.service';
import { EmployeeDetailsVo } from './model/employee-details.vo';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, MatButtonModule, RouterModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {
  protected readonly displayedColumns: string[] = ['name'];
  protected readonly Status = Status;
  protected readonly UserStatus = UserStatus;
  protected vo$?: Observable<EmployeeDetailsVo>;

  private dialog = inject(MatDialog);

  constructor(private readonly route: ActivatedRoute, private readonly service: EmployeeDetailsService) {
  }

  ngOnInit(): void {
    this.vo$ = this.route.params
      .pipe(
        switchMap((params) => {
          const userId = params[RouteParam.EMPLOYEE_ID];

          return this.service.getVo(userId);
        }),
      )
  }

  protected trackEquipment(_: number, equipment: Equipment): string {
    return equipment.id;
  }

  protected onOffboardClick(): void {
    this.dialog.open(OffboardingDialogComponent);
  }
}
