import { TestBed } from '@angular/core/testing';

import { NgTrixLibService } from './ng-trix-lib.service';

describe('NgTrixLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgTrixLibService = TestBed.get(NgTrixLibService);
    expect(service).toBeTruthy();
  });
});
