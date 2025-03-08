import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '../../../entities/user/model/equipment';

@Pipe({
  name: 'equipmentList'
})
export class EquipmentListPipe implements PipeTransform {
  transform(value: Equipment[]): string {
    return value.map(equipment => equipment.name).join(', ');
  }
}
