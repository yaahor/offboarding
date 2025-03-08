import { UserDto } from '../api/user.dto';
import { mapDtoToEquipment } from './map-dto-to-equipment';
import { User } from './user';
import { UserStatus } from './user-status';

export function mapDtoToUser(dto: UserDto): User {
  const status = dto.status === 'ACTIVE' ? UserStatus.ACTIVE : UserStatus.OFFBOARDED;

  return {
    id: dto.id,
    name: dto.name,
    department: dto.department,
    status: status,
    email: dto.email,
    equipments: dto.equipments.map(mapDtoToEquipment),
  }
}
