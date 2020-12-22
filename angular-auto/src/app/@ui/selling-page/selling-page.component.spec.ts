import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellingPageComponent } from './selling-page.component';

describe('SellingPageComponent', () => {
  let component: SellingPageComponent;
  let fixture: ComponentFixture<SellingPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
