import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTimeInfoComponent } from './car-time-info.component';

describe('CarTimeInfoComponent', () => {
  let component: CarTimeInfoComponent;
  let fixture: ComponentFixture<CarTimeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTimeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTimeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
