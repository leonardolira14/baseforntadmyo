import { TestBed } from '@angular/core/testing';

import { SelectivePreloandingStrategyService } from './selective-preloanding-strategy.service';

describe('SelectivePreloandingStrategyService', () => {
  let service: SelectivePreloandingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectivePreloandingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
