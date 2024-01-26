import { TestBed } from '@angular/core/testing';

import { ModelConfigGuardService } from './model-config-guard.service';

describe('ModelConfigGuardService', () => {
  let service: ModelConfigGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelConfigGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
