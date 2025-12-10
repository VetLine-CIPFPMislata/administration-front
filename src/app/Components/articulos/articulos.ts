import { Component } from '@angular/core';
import { Http } from '../../Service/http';
import { Articulo } from '../../Modelos/Articulo';
import { Category } from '../../Modelos/Category';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articulos',
  imports: [RouterLink, FormsModule],
  templateUrl: './articulos.html',
  styleUrl: './articulos.scss',
})
export class Articulos {

  articulosFiltrados: Articulo[] = [];
  categorias: Category[] = [];
  categoriaSeleccionada: string = '';
  
  constructor(private http: Http) {}

  ngOnInit(){
    this.cargarArticulos();

    this.http.getAllCategories().subscribe({
      next: (datos) => {
        if (Array.isArray(datos)) {
          this.categorias = datos;
        } else if ((datos as any).content) {
          this.categorias = (datos as any).content;
        } else if ((datos as any).data) {
          this.categorias = (datos as any).data;
        } else {
          this.categorias = [];
        }
      },
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }
  
  cargarArticulos() {
    this.http.getAll().subscribe({
      next: (datos) => {
        if (Array.isArray(datos)) {
          this.articulosFiltrados = datos;
        } else if ((datos as any).data) {
          this.articulosFiltrados = (datos as any).data;
        } else {
          this.articulosFiltrados = [];
        }
      },
      error: (error) => { console.error('Error completo:', error)}
    });
  }
  
  filtrarPorCategoria() {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
      this.cargarArticulos();
    } else {
      this.http.getProductsByCategory(this.categoriaSeleccionada).subscribe({
        next: (datos) => {
          if (Array.isArray(datos)) {
            this.articulosFiltrados = datos;
          } else {
            this.articulosFiltrados = [];
          }
        },
        error: (error) => console.error('Error al filtrar por categoría:', error)
      });
    }
  }
}
