import { TestBed } from '@angular/core/testing';

import { ServiceDataCompanyService } from './service-data-company.service';

describe('ServiceDataCompanyService', () => {
  let service: ServiceDataCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDataCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
