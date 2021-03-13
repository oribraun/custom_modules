import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameEntityRecognitionComponent } from './name-entity-recognition.component';

describe('NameEntityRecognitionComponent', () => {
  let component: NameEntityRecognitionComponent;
  let fixture: ComponentFixture<NameEntityRecognitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameEntityRecognitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameEntityRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
