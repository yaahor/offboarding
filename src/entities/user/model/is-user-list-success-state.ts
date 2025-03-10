import { Status } from '../../../shared/model/status';
import { UserListState, UserListSuccessState } from './user-list.state';

export function isUserListSuccessState(
  state: UserListState,
): state is UserListSuccessState {
  return state.status === Status.SUCCESS;
}
