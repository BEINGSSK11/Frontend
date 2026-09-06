import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  profile: any;
  data: any;
  adminData: any;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    // API call 1
    this.authService.getProfile().subscribe({
      next: response => {
        console.log('Profile:', response);
        this.profile = response;
      },
      error: error => {
        console.error('Profile error:', error);
      }
    });

    // API call 2
    this.authService.getData().subscribe({
      next: response => {
        console.log('Data:', response);
        this.data = response;
      },
      error: error => {
        console.error('Data error:', error);
      }
    });

    // API call 3
    this.authService.getAdminData().subscribe({
      next: response => {
        console.log('Admin:', response);
        this.adminData = response;
      },
      error: error => {
        console.error('Admin error:', error);
      }
    });
  }
}