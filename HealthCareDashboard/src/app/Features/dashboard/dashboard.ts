import { Component, inject } from '@angular/core';
import { SideNav } from '../../Shared/Components/side-nav/side-nav';
import { HeaderMenu } from '../../Shared/Components/header-menu/header-menu';
import { ProfilePanel } from '../../Shared/Components/profile-panel/profile-panel';
import { DiagnosisChart } from '../../Shared/Components/diagnosis-chart/diagnosis-chart';
import { StatCard } from '../../Shared/Components/stat-card/stat-card';
import { DiagnosisList, LabResult, statusCard } from '../../Core/Model';
import { Patient } from '../../Core/patient';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [SideNav, HeaderMenu, ProfilePanel, DiagnosisChart, StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private destroy$ = new Subject<void>();
  private _pat = inject(Patient);
heartRate:statusCard= {value:78, levels:"Lower than Average"};
respiratRate:statusCard = {value:99, levels:"Normal"};
temperature:statusCard = {value:98.6, levels:"Normal"};
dataLoaded = false;


  diagnostic_list: DiagnosisList[] = [ {   id: 1,  name: 'Type 2 Diabetics',description: 'insulin resistance and high blood sugar',status: "Cured",},{   id: 2, name: 'Asthma',description: 'Recurrent episodes of bronchial constriction',status: "Inactive",}, ]

  labResult: LabResult[] = [{ id: 1, test: 'Blood Test',},{id: 2,test: 'CT Scans',  },]

  ngOnInit() {
    this.getAllAPatient();
    this._pat.heartrate$.pipe(takeUntil(this.destroy$)).subscribe(h => {
     if(h) this.heartRate = h
    })
    this._pat.respiratoryrate$.pipe(takeUntil(this.destroy$)).subscribe(r => {
      if(r) this.respiratRate = r
    })
    this._pat.temperature$.pipe(takeUntil(this.destroy$)).subscribe(t => {
     if(t) this.temperature = t
    })

  }

  getAllAPatient() {
    this._pat.getPatients().pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        if (res.length > 0) {
          const patient = res.find(x => x.name === 'Jessica Taylor');
          this._pat.setPatients(res);
          this._pat.setSelectedPatient(patient);
          this._pat.setDiagnosticHistory(patient.diagnosis_history);
           this.dataLoaded = true;

          this.diagnostic_list = patient.diagnostic_list.map((diag: DiagnosisList, diagIndex: number) => ({
            id: diagIndex + 1,
            name: diag.name,
            description: diag.description,
            status: diag.status
          }))

          this.labResult = patient.lab_results.map((res: LabResult, resIndex: number) => ({
            id: resIndex + 1,
            test: res
          }))
        }
      },
      error: err => console.error(err)
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
