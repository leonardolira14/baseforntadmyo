import { TestBed } from '@angular/core/testing';

import { GirosServiceService } from './giros-service.service';

describe('GirosServiceService', () => {
  let service: GirosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GirosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
