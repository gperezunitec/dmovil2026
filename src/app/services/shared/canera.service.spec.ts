import { TestBed } from '@angular/core/testing';

import { CaneraService } from './canera.service';

describe('CaneraService', () => {
  let service: CaneraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaneraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
