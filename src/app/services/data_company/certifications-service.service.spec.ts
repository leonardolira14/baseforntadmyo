import { TestBed } from '@angular/core/testing';

import { CertificationsServiceService } from './certifications-service.service';

describe('CertificationsServiceService', () => {
  let service: CertificationsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificationsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
