import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authNormalGuard } from './auth-normal.guard';

describe('authNormalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authNormalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
