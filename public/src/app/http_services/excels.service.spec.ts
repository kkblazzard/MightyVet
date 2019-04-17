import { TestBed } from '@angular/core/testing';

import { ExcelsService } from './excels.service';

describe('ExcelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelsService = TestBed.get(ExcelsService);
    expect(service).toBeTruthy();
  });
});
