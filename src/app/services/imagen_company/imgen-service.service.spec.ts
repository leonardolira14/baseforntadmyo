import { TestBed } from '@angular/core/testing';

import { ImgenServiceService } from './imgen-service.service';

describe('ImgenServiceService', () => {
  let service: ImgenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
