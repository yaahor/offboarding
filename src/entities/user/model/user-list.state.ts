import { Status } from '../../../shared/model/status';
import { User } from './user';

export type UserListState =
  | UserListErrorState
  | UserListLoadingState
  | UserListSuccessState;

export interface UserListErrorState {
  status: Status.ERROR;
}

export interface UserListLoadingState {
  status: Status.LOADING;
}

export interface UserListSuccessState {
  items: User[];
  status: Status.SUCCESS;
}
