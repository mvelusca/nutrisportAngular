import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcardComponent } from './dashboardcard.component';

describe('DashboardcardComponent', () => {
  let component: DashboardcardComponent;
  let fixture: ComponentFixture<DashboardcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
