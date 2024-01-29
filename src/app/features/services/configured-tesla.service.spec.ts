import { TestBed } from '@angular/core/testing';

import { ConfiguredTeslaService } from './configured-tesla.service';

describe('ConfiguredTeslaService', () => {
  let service: ConfiguredTeslaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguredTeslaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
