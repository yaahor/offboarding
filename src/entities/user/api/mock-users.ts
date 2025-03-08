import { UserDto } from './user.dto';

export const mockUsers: UserDto[] = [
  {
    id: 'vvv1323',
    name: 'John Doe',
    department: 'Engineering',
    status: 'ACTIVE',
    email: 'some.email@wp.pl',
    equipments: [
      {
        id: 'aaa123456',
        name: 'Macbook air'
      }, {
        id: 'aaa123457',
        name: 'Magic Mouse'
      }
    ],
  },
  {
    id: 'vvv1324',
    name: 'Richard M. Gallegos',
    department: 'Engineering',
    status: 'OFFBOARDED',
    email: 'some.email@wp.pl',
    equipments: [
      {
        id: 'aaa123458',
        name: 'Macbook air'
      }, {
        id: 'aaa123458',
        name: 'Magic Mouse'
      }
    ],
  }
];
