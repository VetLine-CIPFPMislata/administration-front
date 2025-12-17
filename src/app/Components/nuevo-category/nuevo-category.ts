import { Component, inject } from '@angular/core';
import { Http } from '../../Service/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from '../../Modelos/Category';

@Component({
  selector: 'app-nuevo-category',
  imports: [FormsModule],
  templateUrl: './nuevo-category.html',
  styleUrls: ['./nuevo-category.scss'],
})
export class NuevoCategory {
  miHttp = inject(Http);
  router = inject(Router);
  categoria!: Category;
  name!: string;
  description!: string;

  crearCategoria() {
    this.categoria = {
      id: undefined!, // El ID se generará en el backend
      name: this.name,
      description: this.description
    };

    this.miHttp.createCategory(this.categoria).subscribe({
      next: () => {
        this.router.navigate(['/category']);
      },
      error: (err) => {
        console.error('Error creando categoría:', err);
      },
    });
  }

  cancelar() {
    this.router.navigate(['/category']);
  }
}
