import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sessionActiveGuard } from './session-active-guard';

describe('sessionActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sessionActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
