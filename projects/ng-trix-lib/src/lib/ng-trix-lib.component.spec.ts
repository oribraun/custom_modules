import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTrixLibComponent } from './ng-trix-lib.component';

describe('NgTrixLibComponent', () => {
  let component: NgTrixLibComponent;
  let fixture: ComponentFixture<NgTrixLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTrixLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTrixLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
