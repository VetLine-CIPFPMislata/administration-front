import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Footer } from "./Components/footer/footer";
import { AuthService } from './Service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('administrator-front');

  constructor(public router: Router, private authService: AuthService) {}

  get showLayout(): boolean {
    return !this.router.url.includes('/login');
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('Usuario autenticado:', user);
      },
      error: (error) => {
        console.error('Error al obtener el usuario actual:', error);
        this.authService.clearAuth();
        this.router.navigate(['/login']);
      }
    });
}
}
