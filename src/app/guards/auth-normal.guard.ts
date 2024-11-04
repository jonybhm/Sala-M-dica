import { CanActivateFn } from '@angular/router';

export const authNormalGuard: CanActivateFn = (route, state) => {
  return true;
};
