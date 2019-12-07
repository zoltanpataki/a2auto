import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantPageComponent } from './warrant-page.component';

describe('WarrantPageComponent', () => {
  let component: WarrantPageComponent;
  let fixture: ComponentFixture<WarrantPageComponent>;

  beforeEach(async(() => {
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
