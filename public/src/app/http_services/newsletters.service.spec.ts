import { TestBed } from '@angular/core/testing';

import { NewslettersService } from './newsletters.service';

describe('NewslettersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewslettersService = TestBed.get(NewslettersService);
    expect(service).toBeTruthy();
  });
});
