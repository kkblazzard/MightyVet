import { TestBed } from '@angular/core/testing';

import { MenteesService } from './mentees.service';

describe('MenteesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenteesService = TestBed.get(MenteesService);
    expect(service).toBeTruthy();
  });
});
