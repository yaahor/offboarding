import { Status } from '../../../shared/model/status';
import { User } from '../../../shared/model/user';

export type OffboardingVo = OffboardingErrorVo | OffboardingLoadingVo | OffboardingSuccessVo;


export interface OffboardingErrorVo {
  status: Status.ERROR;
}

export interface OffboardingLoadingVo {
  status: Status.LOADING;
}

export interface OffboardingSuccessVo {
  status: Status.SUCCESS;
  users: User[];
}
