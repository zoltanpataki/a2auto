import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesmanComponent } from './salesman.component';

describe('SalesmanComponent', () => {
  let component: SalesmanComponent;
  let fixture: ComponentFixture<SalesmanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
