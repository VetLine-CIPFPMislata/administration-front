import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../Modelos/Articulo';
import { Category } from '../Modelos/Category';
import { Page } from '../Modelos/Page';

@Injectable({
  providedIn: 'root',
})
export class Http {
  constructor(private Mihttp: HttpClient){}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  urlProducts = "/api/products"
  urlCategories = "/api/categories"
  // ng serve --proxy-config proxy.conf.json


  getAll(): Observable <Articulo[]> {
    return this.Mihttp.get<Articulo[]>(this.urlProducts + "?size=100", { headers: this.getAuthHeaders() })
  }

  getAllPaginated(page: number, size: number): Observable<Page<Articulo>> {
    return this.Mihttp.get<Page<Articulo>>(`${this.urlProducts}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() })
  }

  getProductsByCategoryPaginated(category: string, page: number, size: number): Observable<Page<Articulo>> {
    return this.Mihttp.get<Page<Articulo>>(`${this.urlProducts}/search/category/${category}?page=${page}&size=${size}`, { headers: this.getAuthHeaders() })
  }

  getById(id: String): Observable <Articulo> {
    return this.Mihttp.get<Articulo>(this.urlProducts + "/" + id)
  }

  DeleteById(id: String): Observable <Articulo> {
    return this.Mihttp.delete<Articulo>(this.urlProducts + "/" + id, { headers: this.getAuthHeaders() }) 
  }

  ModificarById(id: String, articulo: Articulo): Observable <Articulo>{
    return this.Mihttp.put<Articulo>(this.urlProducts + "/" + id, articulo, { headers: this.getAuthHeaders() })
  }

  Nuevo(articulo: Articulo) {
    return this.Mihttp.post<Articulo>(this.urlProducts, articulo, { headers: this.getAuthHeaders() })
  }

  getAllCategories(): Observable<Category[]> {
    return this.Mihttp.get<Category[]>(this.urlCategories, { headers: this.getAuthHeaders() })
  }

  getProductsByCategory(category: string): Observable<Articulo[]> {
    return this.Mihttp.get<Articulo[]>(this.urlProducts + "/search/category/" + category, { headers: this.getAuthHeaders() })
  }

  getCategoryById(id: string): Observable<Category> {
    return this.Mihttp.get<Category>(this.urlCategories + "/" + id);
  }
  getCategoryByName(name: string): Observable<Category> {
    return this.Mihttp.get<Category>(this.urlCategories + "/search/" + name);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.Mihttp.delete<Category>(this.urlCategories + "/" + id, { headers: this.getAuthHeaders() });
  }

  createCategory(category: Category) {
    return this.Mihttp.post<Category>(this.urlCategories, category, { headers: this.getAuthHeaders() });
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.Mihttp.put<Category>(this.urlCategories + "/" + id, category, { headers: this.getAuthHeaders() });
  }

}
