import { TestBed } from '@angular/core/testing';

import { UserPlatinoRoleGuard } from './user-platino-role.guard';

describe('UserPlatinoRoleGuard', () => {
  let guard: UserPlatinoRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserPlatinoRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
