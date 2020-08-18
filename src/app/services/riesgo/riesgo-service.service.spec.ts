import { TestBed } from '@angular/core/testing';

import { RiesgoServiceService } from './riesgo-service.service';

describe('RiesgoServiceService', () => {
  let service: RiesgoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiesgoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
