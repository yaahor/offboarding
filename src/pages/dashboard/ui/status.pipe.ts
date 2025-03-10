import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus } from '../../../entities/user/model/user-status';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: UserStatus): string {
    switch (value) {
      case UserStatus.ACTIVE:
        return 'Active';
      case UserStatus.OFFBOARDED:
        return 'Offboarded';
    }
  }
}
