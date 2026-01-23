import { CanActivateFn } from '@angular/router';

export const sessionActiveGuard: CanActivateFn = (route, state) => {
  return true;
};
