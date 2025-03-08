import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '../../../shared/model/equipment';

@Pipe({
  name: 'equipmentList'
})
export class EquipmentListPipe implements PipeTransform {
  transform(value: Equipment[]): string {
    return value.map(equipment => equipment.name).join(', ');
  }
}
