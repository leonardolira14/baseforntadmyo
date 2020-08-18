import { TestBed } from '@angular/core/testing';

import { QualifyServicesService } from './qualify-services.service';

describe('QualifyServicesService', () => {
  let service: QualifyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualifyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
