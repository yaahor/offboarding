import { Status } from '../../../shared/model/status';
import { User } from './user';

export type UserState = UserErrorState | UserLoadingState | UserSuccessState;

export interface UserErrorState {
  status: Status.ERROR;
}

export interface UserLoadingState {
  status: Status.LOADING;
}

export interface UserSuccessState {
  user: User;
  status: Status.SUCCESS;
}
