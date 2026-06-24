import { Component, DestroyRef, inject } from '@angular/core';
import { Patient } from 'src/app/Core/patient';
import { filter, map, Observable } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule, NgClass],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  patients$!: Observable<any[]>;
  private _pat = inject(Patient);
  private destroyRef = inject(DestroyRef);  // inject DestroyRef

  selected: string = '';

  ngOnInit() {
    this.patients$ = this._pat.Patient$


    this._pat.Patient$.pipe(
      filter(patients => !!patients && patients.length > 0),  // wait for real data
      takeUntilDestroyed(this.destroyRef)  // auto unsubscribes on destroy
    ).subscribe(patients => {
      const jessica = patients.find((p: any) => p.name === 'Jessica Taylor');
      if (jessica) this.selected = jessica.name;
    });
  }
}


