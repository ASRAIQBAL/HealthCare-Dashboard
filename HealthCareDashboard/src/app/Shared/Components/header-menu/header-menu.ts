import { Component } from '@angular/core';
import { NavBarItem } from '../../../Core/Model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-menu',
  imports: [NgClass],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})


export class HeaderMenu {
  navBarItem: NavBarItem[] = [
    { id: 1, title: "Overview",        route: "", icon: "assets/icons/home_FILL0.svg",           active: false },
    { id: 2, title: "Patients",        route: "", icon: "assets/icons/group_FILL0.svg",           active: true },
    { id: 3, title: "Schedule",        route: "", icon: "assets/icons/calendar_today_FILL0.svg", active: false },
    { id: 4, title: "Messages",        route: "", icon: "assets/icons/chat_bubble_FILL0.svg",    active: false },
    { id: 5, title: "Transactions",    route: "", icon: "assets/icons/credit_card_FILL0.svg",    active: false },
    { id: 6, title: "Dr.Jose Simmons", route: "", icon: "assets/icons/group_FILL0.svg",          active: false },


  ]
}
