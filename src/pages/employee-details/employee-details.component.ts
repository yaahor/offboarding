import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Equipment } from '../../entities/user/model/equipment';
import { User } from '../../entities/user/model/user';
import { UserStatus } from '../../entities/user/model/user-status';
import { RouteParam } from '../../shared/model/route-param';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, MatButtonModule, RouterModule, MatTableModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {
  protected readonly UserStatus = UserStatus;
  protected user$?: Observable<User>;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user$ = this.route.params
      .pipe(
        map((params): User => {
          const userId = params[RouteParam.EMPLOYEE_ID];

          return {
            id: userId,
            name: userId,
            department: userId,
            status: UserStatus.ACTIVE,
            email: userId,
            equipments: [{ id: userId, name: userId}],
            searchable: userId,
          }
        }),
      )
  }

  protected displayedColumns: string[] = ['name'];

  protected trackEquipment(_: number, equipment: Equipment): string {
    return equipment.id;
  }
}
