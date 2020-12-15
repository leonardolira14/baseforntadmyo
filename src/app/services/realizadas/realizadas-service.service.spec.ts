import { TestBed } from '@angular/core/testing';

import { RealizadasServiceService } from './realizadas-service.service';

describe('RealizadasServiceService', () => {
  let service: RealizadasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealizadasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
