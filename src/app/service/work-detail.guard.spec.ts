import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { workDetailGuard } from './work-detail.guard';

describe('workDetailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => workDetailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
