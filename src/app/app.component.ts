import { Component, Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthenticationService } from './SERVICE/authentication.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {

  title = 'nutrisportAngular';
  badgevisible = false;
  public login: boolean = true;
  isLoggedIn: boolean = false;

  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  constructor(
    public router: Router,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {

    this.authService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });

    initFlowbite();

    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    // Change the icons inside the button based on previous settings
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon!.classList.remove('hidden');
    } else {
      themeToggleDarkIcon!.classList.remove('hidden');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn!.addEventListener('click', () => {
      // Toggle icons inside button
      themeToggleDarkIcon!.classList.toggle('hidden');
      themeToggleLightIcon!.classList.toggle('hidden');

      // If set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

      // If NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    });
    
  }

  toggleSidebar() {
    this.sidebar.toggleSidebar();
  }

  public clickLogin() {
    this.router.navigate(['/login']);
  }

  badgevisibility() {
    this.badgevisible = true;
  }

  public clickRegister() {
    this.router.navigate(['/register']);
  }

}