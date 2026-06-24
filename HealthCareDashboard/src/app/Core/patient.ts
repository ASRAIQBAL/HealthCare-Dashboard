import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.dev';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Patient {
  private PatientsSubject = new BehaviorSubject<any>(null)
  private selectedPatientSubject = new BehaviorSubject<any>(null);
  private diagnosticHistorySubject = new BehaviorSubject<any>(null);
  private heartrateSubject = new BehaviorSubject<any>(null);
  private respiratoryrateSubject = new BehaviorSubject<any>(null);
  private temperatureSubject = new BehaviorSubject<any>(null);


  private http = inject(HttpClient)

  getPatients() {
    return this.http.get<any[]>(`${environment.apiurl}/patients`);
  }

  Patient$ = this.PatientsSubject.asObservable();
  selectedPatient$ = this.selectedPatientSubject.asObservable();
  diagnosticHistory$ = this.diagnosticHistorySubject.asObservable();
  heartrate$ = this.heartrateSubject.asObservable();
  respiratoryrate$ = this.respiratoryrateSubject.asObservable();
  temperature$ = this.temperatureSubject.asObservable();




  setPatients(patients: any) {
    this.PatientsSubject.next(patients)
  }

  setSelectedPatient(patient: any) {
    this.selectedPatientSubject.next(patient);
  }

  setDiagnosticHistory(history: any) {
    this.diagnosticHistorySubject.next(history)
  }

  setheartrateArray(statusCards: any) {
    this.heartrateSubject.next(statusCards)
  }

   setrespiratoryrateArray(statusCards: any) {
    this.respiratoryrateSubject.next(statusCards)
  }
   setemperatureArray(statusCards: any) {
    this.temperatureSubject.next(statusCards)
  }
}

