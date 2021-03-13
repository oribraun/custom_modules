import { TestBed } from '@angular/core/testing';

import { NameEntityRecognitionService } from './name-entity-recognition.service';

describe('NameEntityRecognitionService', () => {
  let service: NameEntityRecognitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameEntityRecognitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
