import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GdprPageComponent } from './gdpr-page.component';

describe('GdprPageComponent', () => {
  let component: GdprPageComponent;
  let fixture: ComponentFixture<GdprPageComponent>;

  beforeEach(waitForAsync(() => {
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
