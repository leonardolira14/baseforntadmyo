import { TestBed } from '@angular/core/testing';

import { AsociacionServiceService } from './asociacion-service.service';

describe('AsociacionServiceService', () => {
  let service: AsociacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsociacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
