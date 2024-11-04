import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authVerifyMailGuard } from './auth-verify-mail.guard';

describe('authVerifyMailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authVerifyMailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
