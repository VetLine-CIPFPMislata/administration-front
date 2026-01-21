import { Component, inject } from '@angular/core';
import { Http } from '../../Service/http';
import { Category } from '../../Modelos/Category';
import { RouterLink } from "@angular/router";
import { Subject} from 'rxjs';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-categorias',
  imports: [RouterLink,
    MatDialogModule,
    MatIcon
  ],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.scss'],
})
export class Categorias {
  categorias: Category[] = [];
  filteredCategorias: Category[] = [];
  private search$ = new Subject<string>();
  
  modal = false;
  borrarCategoria!: Category;

  miHttp = inject(Http);

  ngOnInit() {
    this.cargarCategorias();

    this.search$.subscribe({
      next: (busqueda) => this.aplicarFiltro(busqueda),
      error: (err) => console.error('Error en el stream de búsqueda:', err),
    });
  }
    

  cargarCategorias() {
    this.miHttp.getAllCategories().subscribe({
      next: (datos) => {
        this.categorias = datos;
        this.filteredCategorias = this.categorias;
      },
      error: (err) => console.error('Error cargando categorías:', err),
    });
  }

  onSearch(busqueda: string) {
    this.search$.next(busqueda);
  }

  openDeleteModal(category: Category) {
    this.borrarCategoria = category;
    this.modal = true;
  }

  close() {
    this.modal = false;
  }

  borrar(id: string) {
    this.miHttp.deleteCategory(id).subscribe({
      next: () => {
        this.categorias = this.categorias.filter((category) => category.id != this.borrarCategoria.id);
        this.filteredCategorias = this.filteredCategorias.filter((category) => category.id != this.borrarCategoria.id);
        this.close();
        this.cargarCategorias();
      },
      error: (err) => {
        console.error('Error borrando la categoría:', err);
        if (err.status === 409) {
          alert('No se puede eliminar esta categoría porque tiene productos asociados.');
        }
        this.close();
      },
    });
  }

  private aplicarFiltro(busqueda: string) {
    if (!busqueda) {
      this.filteredCategorias = this.categorias;
      return;
    }
    const busquedaLower = busqueda.toString().toLowerCase();
    this.filteredCategorias = this.categorias.filter((category) => {
      const name = (category.name).toString().toLowerCase();
      const id = (category.id).toString().toLowerCase();
      return name.includes(busquedaLower) || id.includes(busquedaLower);
    });
  }
}