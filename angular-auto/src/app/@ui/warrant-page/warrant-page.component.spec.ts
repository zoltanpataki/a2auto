import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WarrantPageComponent } from './warrant-page.component';

describe('WarrantPageComponent', () => {
  let component: WarrantPageComponent;
  let fixture: ComponentFixture<WarrantPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
