import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InsurancePageComponent } from './insurance-page.component';

describe('InsurancePageComponent', () => {
  let component: InsurancePageComponent;
  let fixture: ComponentFixture<InsurancePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
