import { TestBed } from '@angular/core/testing';

import { AccreditationsService } from './accreditations.service';

describe('AccreditationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccreditationsService = TestBed.get(AccreditationsService);
    expect(service).toBeTruthy();
  });
});
