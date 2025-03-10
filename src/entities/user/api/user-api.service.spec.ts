import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OnboardingDto } from './onboarding.dto';

import { UserApiService } from './user-api.service';
import { UserDto } from './user.dto';

describe(UserApiService.name, () => {
  let service: UserApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should retrieve a list of users', () => {
      const mockUsers: UserDto[] = [
        {
          id: '1',
          name: 'User 1',
          department: 'Department 1',
          email: 'user1@email',
          equipments: [],
          status: 'ACTIVE',
        },
        {
          id: '2',
          name: 'User 2',
          department: 'Department 1',
          email: 'user2@email',
          equipments: [],
          status: 'OFFBOARDED',
        },
      ];

      service.getUsers().subscribe((users) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/employees',
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockUsers);
    });

    it('should handle error when get users fails', () => {
      service.getUsers().subscribe({
        next: () => fail('should have failed with a 500 error'),
        error: (error) => {
          expect(error.status).toEqual(500);
        },
      });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/employees',
      );
      expect(req.request.method).toEqual('GET');
      req.flush('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('getUser', () => {
    it('should retrieve a user by id', () => {
      const mockUser: UserDto = { id: 'testID', name: 'User 1' } as UserDto;

      service.getUser('testID').subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/employees/testID',
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockUser);
    });

    it('should handle error when get user fails', () => {
      service.getUser('testID').subscribe({
        next: () => fail('should have failed with a 404 error'),
        error: (error) => {
          expect(error.status).toEqual(404);
        },
      });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/employees/testID`,
      );
      expect(req.request.method).toEqual('GET');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('conductOffboarding', () => {
    it('should conduct offboarding', () => {
      const mockOnboardingDto: OnboardingDto = {
        receiver: 'testReceiver',
      } as OnboardingDto;

      service
        .conductOffboarding('testID', mockOnboardingDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
        });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/users/testID/offboard`,
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockOnboardingDto);
      req.flush(null);
    });

    it('should handle error when conduct offboarding fails', () => {
      const mockOnboardingDto: OnboardingDto = {
        receiver: 'testReceiver',
      } as OnboardingDto;

      service.conductOffboarding('testID', mockOnboardingDto).subscribe({
        next: () => fail('should have failed with a 500 error'),
        error: (error) => {
          expect(error.status).toEqual(500);
        },
      });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/users/testID/offboard`,
      );
      expect(req.request.method).toEqual('POST');
      req.flush('Internal Server Error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });
});
