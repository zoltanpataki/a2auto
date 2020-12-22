import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreditDialogComponent } from './credit-dialog.component';

describe('CreditDialogComponent', () => {
  let component: CreditDialogComponent;
  let fixture: ComponentFixture<CreditDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
