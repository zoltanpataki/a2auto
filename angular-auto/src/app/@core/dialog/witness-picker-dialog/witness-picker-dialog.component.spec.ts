import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WitnessPickerDialogComponent } from './witness-picker-dialog.component';

describe('WitnessPickerDialogComponent', () => {
  let component: WitnessPickerDialogComponent;
  let fixture: ComponentFixture<WitnessPickerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnessPickerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
