import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WitnessDialogComponent } from './witness-dialog.component';

describe('WitnessDialogComponent', () => {
  let component: WitnessDialogComponent;
  let fixture: ComponentFixture<WitnessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WitnessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WitnessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
