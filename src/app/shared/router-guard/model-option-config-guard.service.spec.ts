import { TestBed } from '@angular/core/testing';

import { ModelOptionConfigGuardService } from './model-option-config-guard.service';

describe('ModelOptionConfigGuardService', () => {
  let service: ModelOptionConfigGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelOptionConfigGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
