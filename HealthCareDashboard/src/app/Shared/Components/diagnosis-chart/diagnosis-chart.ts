import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Patient } from 'src/app/Core/patient';


@Component({
  selector: 'app-diagnosis-chart',
  imports: [CommonModule],
  templateUrl: './diagnosis-chart.html',
  styleUrl: './diagnosis-chart.scss',
})
export class DiagnosisChart implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private _pat = inject(Patient);
  hoverData$ = new BehaviorSubject<{ systolic: number; diastolic: number;systoliclevel:string; diastoliclevel:string } | null>(null);
  private destroy$ = new Subject<void>();
  private zone = inject(NgZone);

  diagnosticHistory$!: Observable<any>;
  chart: any;
  labels: string[] = [];
  systolicData: number[] = [];
  diastolicData: number[] = [];
  heartrate:string[] = [];
  respiratoryrate:string[] = [];
  temperature:string[] = [];
  systoliclavel: string[]=[];
  diastoliclevel: string[]=[];

  ngOnInit() {
    this._pat.diagnosticHistory$.pipe(takeUntil(this.destroy$)).subscribe(history => {
      if (!history) return;

      const data = [...history].reverse();

      this.labels = data.map(
        (h: any) => `${h.month.substring(0, 3)}, ${h.year}`
      );

      this.systolicData = data.map(
        (h: any) => h.blood_pressure.systolic.value
      );
      this.systoliclavel= data.map(
        (h: any) => h.blood_pressure.systolic.levels
      );

      this.diastolicData = data.map(
        (h: any) => h.blood_pressure.diastolic.value
      );
       this.diastoliclevel= data.map(
        (h: any) => h.blood_pressure.diastolic.levels
      );

      this.heartrate = data.map((h:any)=>h.heart_rate)
            this.respiratoryrate = data.map((h:any)=>h.respiratory_rate)
      this.temperature = data.map((h:any)=>h.temperature)



      
      this.updateChart();

    });
  }


  updateChart() {
    if (!this.chart) return;

    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.systolicData;
    this.chart.data.datasets[1].data = this.diastolicData;

    this.chart.update();
  }


  ngAfterViewInit(): void {
    const ctx = this.chartCanvas.nativeElement;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        // labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
        datasets: [
          {
            label: 'Systolic',
            // data: [120, 122, 160, 125, 145, 160],
            data: [] as number[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 8,

          },
          {
            label: 'Diastolic',
            // data: [90, 65, 100, 85, 70, 78],
            data: [] as number[],
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 8,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },

        elements: {
          point: {
            radius: 4,
            hoverRadius: 8
          }
        },

        onHover: (event, activeElements, chart) => {
          if (!activeElements.length) return;

          const index = activeElements[0].index;
         this._pat.setheartrateArray(this.heartrate[index])
         this._pat.setemperatureArray(this.temperature[index])
         this._pat.setrespiratoryrateArray(this.respiratoryrate[index])

          this.zone.run(() => {
            this.hoverData$.next({
              systolic: this.systolicData[index],
              diastolic: this.diastolicData[index],
              systoliclevel:this.systoliclavel[index],
              diastoliclevel:this.diastoliclevel[index]
            });
          });
        },

        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
    this.updateChart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.chart) {
      this.chart.destroy();
    }
  }
}

