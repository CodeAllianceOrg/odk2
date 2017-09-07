import { TestBed, inject } from '@angular/core/testing';

import { SelectionsService } from './selections.service';

describe('SelectionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionsService]
    });
  });

  it('should be created', inject([SelectionsService], (service: SelectionsService) => {
    expect(service).toBeTruthy();
  }));
});
