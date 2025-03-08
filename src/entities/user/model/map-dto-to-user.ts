import { UserDto } from '../api/user.dto';
import { createSearchableValue } from './create-seachable-value';
import { mapDtoToEquipment } from './map-dto-to-equipment';
import { User } from './user';
import { UserStatus } from './user-status';

export function mapDtoToUser(dto: UserDto): User {
  const status = dto.status === 'ACTIVE' ? UserStatus.ACTIVE : UserStatus.OFFBOARDED;

  const searchable = createSearchableValue(
    dto.name,
    dto.department,
    dto.email,
    ...dto.equipments.map(equipment => equipment.name),
    // todo add status?
  )

  return {
    id: dto.id,
    name: dto.name,
    department: dto.department,
    status: status,
    email: dto.email,
    equipments: dto.equipments.map(mapDtoToEquipment),
    searchable,
  }
}
