import { EquipmentDto } from './equipment.dto';

export interface UserDto {
  id: string,
  name: string,
  department: string,
  status: 'ACTIVE' | 'OFFBOARDED',
  email: string,
  equipments: EquipmentDto[];
}
