import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.authService.clearAuth();
    this.router.navigate(['/login']);
  }
}
