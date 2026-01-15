import { Component } from '@angular/core';
import { Http } from '../../Service/http';
import { Articulo } from '../../Modelos/Articulo';
import { Category } from '../../Modelos/Category';
import { Page } from '../../Modelos/Page';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-articulos',
  imports: [RouterLink, FormsModule, MatIcon],
  templateUrl: './articulos.html',
  styleUrl: './articulos.scss',
})
export class Articulos {

  articulosFiltrados: Articulo[] = [];
  todosLosArticulosFiltrados: Articulo[] = [];
  categorias: Category[] = [];
  categoriaSeleccionada: string = '';
  
  currentPage: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;
  
  constructor(private http: Http) {}

  ngOnInit(){
    this.cargarArticulos();

    this.http.getAllCategories().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => console.log(error)
    });
  }
  
  cargarArticulos() {
    this.isLoading = true;
    this.todosLosArticulosFiltrados = [];
    this.http.getAllPaginated(this.currentPage, this.pageSize).subscribe({
      next: (response: Page<Articulo>) => {
        this.articulosFiltrados = response.data;
        this.totalElements = response.totalElements;
        this.totalPages = this.calcularTotalPaginas(this.totalElements, this.pageSize);
        this.isLoading = false;
      },
      error: (error) => { 
        console.error('Error completo:', error);
        this.isLoading = false;
      }
    });
  }
  
  filtrarPorCategoria() {
    this.currentPage = 1; 
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
      this.cargarArticulos();
    } else {
      this.isLoading = true;
      this.http.getProductsByCategory(this.categoriaSeleccionada).subscribe({
        next: (productos: Articulo[]) => {
          this.todosLosArticulosFiltrados = productos;
          this.totalElements = productos.length;
          this.totalPages = this.calcularTotalPaginas(this.totalElements, this.pageSize);
          this.aplicarPaginacionLocal();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al filtrar por categoría:', error);
          this.articulosFiltrados = [];
          this.totalElements = 0;
          this.totalPages = 0;
          this.isLoading = false;
        }
      });
    }
  }

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }


  calcularElementoFinal(): number {
    const elementoFinal = this.currentPage * this.pageSize;
    if (elementoFinal > this.totalElements) {
      return this.totalElements;
    } else {
      return elementoFinal;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadCurrentView();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCurrentView();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCurrentView();
    }
  }

  private loadCurrentView() {
    if (!this.categoriaSeleccionada || this.categoriaSeleccionada === '') {
      this.cargarArticulos();
    } else {
      if (this.todosLosArticulosFiltrados.length > 0) {
        this.aplicarPaginacionLocal();
      } else {
        this.filtrarPorCategoria();
      }
    }
  }

  getVisiblePages(): number[] {
    const maxVisiblePages = 5;
    const pages: number[] = [];
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = 2;
      let startPage = this.currentPage - halfVisible;
      if (startPage < 1) {
        startPage = 1;
      }
      
      let endPage = startPage + maxVisiblePages - 1;
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - maxVisiblePages + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }

  private calcularTotalPaginas(totalElementos: number, tamanioPagina: number): number {
    if (totalElementos === 0 || tamanioPagina === 0) {
      return 0;
    }
    
    const division = totalElementos / tamanioPagina;
    const parteEntera = parseInt(division.toString());

    if (division === parteEntera) {
      return parteEntera;
    } else {
      return parteEntera + 1;
    }
  }

  private aplicarPaginacionLocal() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.articulosFiltrados = this.todosLosArticulosFiltrados.slice(startIndex, endIndex);
  }
}
