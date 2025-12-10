import { Component, inject } from '@angular/core';
import { Http } from '../../Service/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from '../../Modelos/Category';

@Component({
  selector: 'app-nuevo-category',
  imports: [FormsModule],
  templateUrl: './nuevo-category.html',
  styleUrl: './nuevo-category.scss',
})
export class NuevoCategory {
  miHttp = inject(Http);
  router = inject(Router);
  categoria!: Category;
  desactivado = false;
  name!: string;
  description!: string;

  crearCategoria() {
    this.desactivado = true;
    this.categoria = {
      id: undefined!, // El ID se generará en el backend
      name: this.name,
      description: this.description
    };

    this.miHttp.createCategory(this.categoria).subscribe({
      next: () => {
        this.desactivado = false;
        this.router.navigate(['/category']);
      },
      error: (err) => {
        console.error('Error creando categoría:', err);
        this.desactivado = false;
      },
    });
  }

  cancelar() {
    this.router.navigate(['/category']);
  }
}
