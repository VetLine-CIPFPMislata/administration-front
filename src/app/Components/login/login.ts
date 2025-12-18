import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { LoginRequest } from '../../Modelos/LoginRequest';

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

        this.authService.saveToken(response.token);
        this.authService.saveUserEmail(response.email);
        this.authService.saveUserName(response.name);


        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            console.log('Usuario verificado como admin:', user);
            this.isLoading = false;
            this.router.navigate(['/articulos']);
          },
          error: (error) => {
            console.error('Usuario sin permisos de admin:', error);
            this.isLoading = false;
            this.authService.clearAuth();
            
            if (error.status === 403) {
              this.errorMessage = 'No tienes permisos de administrador para acceder a esta aplicación.';
            } else {
              this.errorMessage = 'Error al verificar permisos. Por favor, intenta de nuevo.';
            }
          }
        });
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Por favor, verifica tu email y contraseña.';
        } else {
          this.errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
        }
      }
    });
  }
}
