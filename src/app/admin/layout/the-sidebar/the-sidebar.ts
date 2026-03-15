import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth';

@Component({
  selector: 'app-the-sidebar',
  imports: [RouterModule],
  templateUrl: './the-sidebar.html',
  styleUrl: './the-sidebar.scss',
})
export class TheSidebar {
  private router = inject(Router);
  private authService = inject(AuthService);

  isCollapsed = true;
  openSection: 'products' | 'users' | null = 'products';

  toggleSection(section: 'products' | 'users') {
    this.openSection = this.openSection === section ? null : section;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']);
      },
    });
  }
}
