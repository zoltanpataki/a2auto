import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstantBuyingDialogComponent } from './instant-buying-dialog.component';

describe('InstantBuyingDialogComponent', () => {
  let component: InstantBuyingDialogComponent;
  let fixture: ComponentFixture<InstantBuyingDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantBuyingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantBuyingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
