import { User } from '../../../entities/user/model/user';
import { Sort } from '../model/sort';
import { SortKey } from '../model/sort-key';

export function sortUsers(users: User[], sort: Sort): void {
  if (!sort.direction) {
    return;
  }

  const isAsc = sort.direction === 'asc';

  users.sort((a, b) => {
    switch (sort.active) {
      case SortKey.NAME:
        return compare(a.name, b.name, isAsc);
      case SortKey.EMAIL:
        return compare(a.email, b.email, isAsc);
      case SortKey.DEPARTMENT:
        return compare(a.department, b.department, isAsc);
      case SortKey.EQUIPMENT:
        return compare(a.equipments.join(', '), b.equipments.join(', '), isAsc); // todo move to function?
      case SortKey.STATUS:
        return compare(a.status, b.status, isAsc); // todo format?
      default:
        return 0;
    }
  });
}

function compare(a: string, b: string, isAsc: boolean) {
  return a.localeCompare(b) * (isAsc ? 1 : -1);
}
