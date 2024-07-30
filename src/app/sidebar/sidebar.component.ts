import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    public router: Router,
  ) { }

  openSidebar: boolean = false;


  toggleSidebar() {
    this.openSidebar = !this.openSidebar;
  }

}
