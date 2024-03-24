import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantLawsPageComponent } from './warrant-laws-page.component';

describe('WarrantLawsPageComponent', () => {
  let component: WarrantLawsPageComponent;
  let fixture: ComponentFixture<WarrantLawsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarrantLawsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarrantLawsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
