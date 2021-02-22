import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgTrixLibComponent } from './ng-trix-lib.component';

describe('NgTrixLibComponent', () => {
  let component: NgTrixLibComponent;
  let fixture: ComponentFixture<NgTrixLibComponent>;

  beforeEach(waitForAsync(() => {
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
