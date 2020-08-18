import { TestBed } from '@angular/core/testing';

import { VisitasServiceService } from './visitas-service.service';

describe('VisitasServiceService', () => {
  let service: VisitasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
