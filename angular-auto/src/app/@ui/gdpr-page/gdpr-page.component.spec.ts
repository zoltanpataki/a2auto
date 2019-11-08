import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprPageComponent } from './gdpr-page.component';

describe('GdprPageComponent', () => {
  let component: GdprPageComponent;
  let fixture: ComponentFixture<GdprPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdprPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdprPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
