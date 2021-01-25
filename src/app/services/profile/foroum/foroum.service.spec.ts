import { TestBed } from '@angular/core/testing';

import { ForoumService } from './foroum.service';

describe('ForoumService', () => {
  let service: ForoumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForoumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
