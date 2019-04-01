import { TestBed } from '@angular/core/testing';

import { MentorsService } from './mentors.service';

describe('MentorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MentorsService = TestBed.get(MentorsService);
    expect(service).toBeTruthy();
  });
});
