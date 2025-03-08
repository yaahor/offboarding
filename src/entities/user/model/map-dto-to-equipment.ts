import { EquipmentDto } from '../api/equipment.dto';
import { Equipment } from './equipment';

export function mapDtoToEquipment(dto: EquipmentDto): Equipment {
  return { id: dto.id, name: dto.name };
}
