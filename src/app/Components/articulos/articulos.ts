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

  articulos: Articulo[] = [];
  articulosFiltrados: Articulo[] = [];
  categorias: Category[] = [];
  categoriaSeleccionada: string = '';
  
  constructor(private http: Http) {}

  ngOnInit(){
    this.http.getAll().subscribe({
      next: (datos) => {
        this.articulos = Array.isArray(datos) ? datos : (datos as any).content || (datos as any).data || [];
        this.articulosFiltrados = this.articulos;
      },
      error: (error) => { console.error('Error completo:', error)}
    });

    this.http.getAllCategories().subscribe({
      next: (datos) => {
        this.categorias = Array.isArray(datos) ? datos : (datos as any).content || (datos as any).data || [];
      },
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }
  
  filtrarPorCategoria() {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
      this.articulosFiltrados = this.articulos;
    } else {
      this.articulosFiltrados = this.articulos.filter(articulo => 
        String(articulo.category.id) === String(this.categoriaSeleccionada)
      );
    }
  }
}
