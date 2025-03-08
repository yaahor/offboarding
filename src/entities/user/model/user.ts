import { Equipment } from './equipment';
import { UserStatus } from './user-status';

export interface User {
  id: string,
  name: string,
  department: string,
  status: UserStatus,
  email: string,
  equipments: Equipment[];
}
