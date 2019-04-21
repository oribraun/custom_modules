import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTrixComponentComponent } from './ng-trix-component.component';

describe('NgTrixComponentComponent', () => {
  let component: NgTrixComponentComponent;
  let fixture: ComponentFixture<NgTrixComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTrixComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTrixComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
