import { TestBed } from '@angular/core/testing';
import { delay, filter, of, throwError } from 'rxjs';
import { Status } from '../../../shared/model/status';
import { UserApiService } from '../api/user-api.service';
import { UserDto } from '../api/user.dto';
import { mapOffboardingDataToDto } from './map-offboarding-data-to-dto';
import { OffboardingData } from './offboarding-data';
import { OffboardingState } from './offboarding.state';
import { User } from './user';
import { UserListState, UserListSuccessState } from './user-list.state';
import { UserStatus } from './user-status';

import { UserService } from './user.service';
import { UserState, UserSuccessState } from './user.state';

describe(UserService.name, () => {
  let service: UserService;
  let userApiServiceSpy: jasmine.SpyObj<UserApiService>;

  const mockUserDTO: UserDto = {
    id: 'user1',
    name: 'Test User',
    email: 'test@example.com',
    department: 'Test Department',
    equipments: [{ id: 'eq1', name: 'Test Equipment' }],
    status: 'ACTIVE'
  };

  const mockUser: User = {
    id: 'user1',
    name: 'Test User',
    email: 'test@example.com',
    department: 'Test Department',
    equipments: [{ id: 'eq1', name: 'Test Equipment' }],
    status: UserStatus.ACTIVE,
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserApiService', ['getUsers', 'getUser', 'conductOffboarding']);

    TestBed.configureTestingModule({
      providers: [{ provide: UserApiService, useValue: spy }],
    });
    service = TestBed.inject(UserService);
    userApiServiceSpy = TestBed.inject(UserApiService) as jasmine.SpyObj<UserApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should fetch users from API and update store if not loaded', (done) => {
      const mockUserDTOs: UserDto[] = [mockUserDTO];
      userApiServiceSpy.getUsers.and.returnValue(of(mockUserDTOs));

      service.getUsers().subscribe(state => {
        expect(state.status).toBe(Status.SUCCESS);
        expect((state as UserListSuccessState).items).toEqual([mockUser]);
        expect(userApiServiceSpy.getUsers).toHaveBeenCalled();
        done();
      });
    });

    it('should return existing state if already loaded', (done) => {
      const mockUserDTOs: UserDto[] = [mockUserDTO];
      userApiServiceSpy.getUsers.and.returnValue(of(mockUserDTOs));

      service.getUsers().subscribe(() => {
        userApiServiceSpy.getUsers.calls.reset();
        service.getUsers().subscribe(state => {
          expect(state.status).toBe(Status.SUCCESS);
          expect((state as UserListSuccessState).items).toEqual([mockUser]);
          expect(userApiServiceSpy.getUsers).not.toHaveBeenCalled();
          done();
        });
      });
    });

    it('should handle API error', (done) => {
      userApiServiceSpy.getUsers.and.returnValue(throwError(() => new Error('API error')));

      service.getUsers().subscribe(state => {
        expect(state.status).toBe(Status.ERROR);
        expect(userApiServiceSpy.getUsers).toHaveBeenCalled();
        done();
      });
    });

    it('should emit loading state then correct state', (done) => {
      const mockUserDTOs: UserDto[] = [mockUserDTO];
      userApiServiceSpy.getUsers.and.returnValue(of(mockUserDTOs).pipe(delay(0)));

      const states: UserListState[] = [];

      service.getUsers().subscribe((state) => {
        states.push(state);
        if (states.length === 2) {
          expect(states[0].status).toBe(Status.LOADING);
          expect(states[1].status).toBe(Status.SUCCESS);
          done();
        }
      })
    })

  });

  describe('getUser', () => {
    it('should fetch user by ID from API', (done) => {
      userApiServiceSpy.getUser.and.returnValue(of(mockUserDTO));

      service.getUser('1')
        .pipe(filter(state => state.status === Status.SUCCESS))
        .subscribe(
          state => {
            expect(state.status).toBe(Status.SUCCESS);
            expect((state as UserSuccessState).user).toEqual(mockUser);
            expect(userApiServiceSpy.getUser).toHaveBeenCalledWith('1');
            done();
          });
    });

    it('should handle API error', (done) => {
      userApiServiceSpy.getUser.and.returnValue(throwError(() => new Error('API error')));

      service.getUser('1')
        .pipe(filter(state => state.status === Status.ERROR))
        .subscribe(state => {
          expect(state.status).toBe(Status.ERROR);
          expect(userApiServiceSpy.getUser).toHaveBeenCalledWith('1');
          done();
        });
    });

    it('should emit loading state then correct state', (done) => {
      userApiServiceSpy.getUser.and.returnValue(of(mockUserDTO));
      const states: UserState[] = [];

      service.getUser('1').subscribe((state) => {
        states.push(state);
        if (states.length === 2) {
          expect(states[0].status).toBe(Status.LOADING);
          expect(states[1].status).toBe(Status.SUCCESS);
          done();
        }
      })
    })
  });

  describe('conductOffboarding', () => {
    it('should conduct offboarding and update user status', (done) => {
      const mockOffboardingData: OffboardingData = {
        receiver: 'Test Receiver',
        email: 'test@example.com',
        phone: '123456789',
        streetLine: 'Test Street',
        city: 'Test City',
        postalCode: '12345',
        country: 'Test Country'
      };
      const mockOffboardingDto = mapOffboardingDataToDto(mockOffboardingData);
      userApiServiceSpy.conductOffboarding.and.returnValue(of(void 0));

      service.conductOffboarding('1', mockOffboardingData)
        .pipe(filter(state => state.status === Status.SUCCESS))
        .subscribe(state => {
          expect(state.status).toBe(Status.SUCCESS);
          expect(userApiServiceSpy.conductOffboarding).toHaveBeenCalledWith('1', mockOffboardingDto);
          done();
        });
    });

    it('should handle API error', (done) => {
      const mockOffboardingData: OffboardingData = {
        receiver: 'Test Receiver',
        email: 'test@example.com',
        phone: '123456789',
        streetLine: 'Test Street',
        city: 'Test City',
        postalCode: '12345',
        country: 'Test Country'
      };
      userApiServiceSpy.conductOffboarding.and.returnValue(throwError(() => new Error('API error')));

      service.conductOffboarding('1', mockOffboardingData)
        .pipe(filter(state => state.status === Status.ERROR))
        .subscribe(state => {
          expect(state.status).toBe(Status.ERROR);
          expect(userApiServiceSpy.conductOffboarding).toHaveBeenCalled();
          done();
        });
    });
    it('should emit loading state then correct state', (done) => {
      const mockOffboardingData: OffboardingData = {
        receiver: 'Test Receiver',
        email: 'test@example.com',
        phone: '123456789',
        streetLine: 'Test Street',
        city: 'Test City',
        postalCode: '12345',
        country: 'Test Country'
      };
      userApiServiceSpy.conductOffboarding.and.returnValue(of(void 0));
      const states: OffboardingState[] = [];
      service.conductOffboarding('1', mockOffboardingData).subscribe((state) => {
        states.push(state);
        if (states.length === 2) {
          expect(states[0].status).toBe(Status.LOADING);
          expect(states[1].status).toBe(Status.SUCCESS);
          done()
        }
      })
    })
  });
});
