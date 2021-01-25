import { TestBed } from '@angular/core/testing';

import { UserPrivilegesGuard } from './user-privileges.guard';

describe('UserPrivilegesGuard', () => {
  let guard: UserPrivilegesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPrivilegesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
