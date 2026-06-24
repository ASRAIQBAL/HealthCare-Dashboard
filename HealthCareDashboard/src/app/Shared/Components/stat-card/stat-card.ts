import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})

export class StatCard {

  @Input() cardlabel: string = "";
  @Input() cardtitle: string = "";
  @Input() cardvalue: any ;
  @Input() bgcolor: string = "";
  @Input() cardicon:string= "";


}
