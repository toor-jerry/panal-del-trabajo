import { TestBed } from '@angular/core/testing';

import { EnterpriseRoleGuard } from './enterprise-role.guard';

describe('EnterpriseRoleGuard', () => {
  let guard: EnterpriseRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EnterpriseRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
