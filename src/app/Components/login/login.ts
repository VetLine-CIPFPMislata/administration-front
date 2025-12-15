import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../Service/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/articulos']);
    }
  }

  onLogin() {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;

        if (response.role !== 'ADMIN') {
          this.errorMessage = 'Acceso denegado. Solo administradores pueden acceder a esta aplicación.';
          return;
        }


        this.authService.saveToken(response.token);
        this.authService.saveUserRole(response.role);
        this.authService.saveUserEmail(response.email);
        this.authService.saveUserName(response.name);

        this.router.navigate(['/articulos']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.';
        } else if (error.status === 403) {
          this.errorMessage = 'No tienes permisos para acceder a esta aplicación.';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
        }
      }
    });
  }
}
