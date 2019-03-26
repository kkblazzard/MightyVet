import { TestBed } from '@angular/core/testing';

import { WebinarsService } from './webinars.service';

describe('WebinarsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebinarsService = TestBed.get(WebinarsService);
    expect(service).toBeTruthy();
  });
});
