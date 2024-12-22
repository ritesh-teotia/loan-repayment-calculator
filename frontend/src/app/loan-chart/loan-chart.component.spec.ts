import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanChartComponent } from './loan-chart.component';

describe('LoanChartComponent', () => {
  let component: LoanChartComponent;
  let fixture: ComponentFixture<LoanChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
