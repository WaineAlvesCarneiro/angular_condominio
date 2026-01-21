// src/app/layout/layout.component.ts

import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../core/services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  styleUrls: ['./layout.css'],
  standalone: false
})
export class Layout implements OnInit {
  title(): string {
    return 'Condomínio'; 
  }

  isLoggedIn = false;
  isSidebarMinimized = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}