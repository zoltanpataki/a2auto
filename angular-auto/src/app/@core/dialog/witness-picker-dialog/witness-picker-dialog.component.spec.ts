import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessPickerDialogComponent } from './witness-picker-dialog.component';

describe('WitnessPickerDialogComponent', () => {
  let component: WitnessPickerDialogComponent;
  let fixture: ComponentFixture<WitnessPickerDialogComponent>;

  beforeEach(async(() => {
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
