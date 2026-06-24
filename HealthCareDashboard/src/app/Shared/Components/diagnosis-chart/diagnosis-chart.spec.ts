import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisChart } from './diagnosis-chart';

describe('DiagnosisChart', () => {
  let component: DiagnosisChart;
  let fixture: ComponentFixture<DiagnosisChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosisChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
