import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../Modelos/Category';
import { Http } from '../../Service/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  imports: [FormsModule],
  templateUrl: './editar-categoria.html',
  styleUrls: ['./editar-categoria.scss'],
})
export class EditarCategoria {

  constructor( private miHttp: Http, private router: Router, private route: ActivatedRoute) {}

  categoria!: Category;
  isLoading = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        console.error('No se proporcionó id de categoría');
        this.router.navigate(['/category']);
        return;
      }

      this.isLoading = true;
      this.miHttp.getCategoryById(id).subscribe({
        next: (categoria) => {
          this.categoria = categoria;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error al cargar la categoría:', err);
          this.isLoading = false;
        },
      });
    });
  }
  

  guardarCambios() {
    if (!this.categoria.id) {
      console.error('ID de categoría inválido');
      return;
    }
    this.miHttp.updateCategory(this.categoria.id, this.categoria).subscribe({
      next: () => {
        this.router.navigate(['/category']);
      },
      error: (err) => {
        console.error('Error al actualizar la categoría:', err);
      },
    });
  }

  cancelar() {
    this.router.navigate(['/category']);
  }
}