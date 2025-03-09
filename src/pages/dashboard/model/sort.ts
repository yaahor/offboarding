import { SortKey } from './sort-key';

export interface Sort {
  active: SortKey,
  direction: 'asc' | 'desc' | '',
}
