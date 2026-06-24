import { Component, inject } from '@angular/core';
import { ProfileInfo } from '../../../Core/Model';
import { Patient } from 'src/app/Core/patient';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-profile-panel',
  imports: [CommonModule],
  templateUrl: './profile-panel.html',
  styleUrl: './profile-panel.scss',
})
export class ProfilePanel {

  selectedpatient$!: Observable<any>;
  private _pat = inject(Patient);
  profileInfo: ProfileInfo[] = [];

  ngOnInit() {
    this.selectedpatient$ = this._pat.selectedPatient$.pipe(map(pat => {
      if (!pat) return null;
      return {
        profileInfo: [
          {
            label: 'Date Of Birth',
            value: pat.date_of_birth,
            icon: 'assets/icons/BirthIcon.svg'
          },

          {
            label: 'Gender',
            value: pat.gender,
            icon: 'assets/icons/FemaleIcon.svg'
          },
          {
            label: 'Contact Info',
            value: pat.phone_number,
            icon: 'assets/icons/PhoneIcon.svg'
          },
          {
            label: 'Emergency Contacts',
            value: pat.emergency_contact,
            icon: 'assets/icons/PhoneIcon.svg'
          },
          {
            label: 'Insurance Provider',
            value: pat.insurance_type,
            icon: 'assets/icons/InsuranceIcon.svg'
          }
        ],
        name: pat.name,
        image: pat.profile_picture
      };
    })
    );
  }



}
