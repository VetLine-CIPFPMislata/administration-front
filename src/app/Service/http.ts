import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../Modelos/Articulo';
import { Category } from '../Modelos/Category';

@Injectable({
  providedIn: 'root',
})
export class Http {
  constructor(private Mihttp: HttpClient){}

  urlProducts = "/api/products"
  urlCategories = "/api/categories"
  // ng serve --proxy-config proxy.conf.json

  getAll(): Observable <Articulo[]> {
    return this.Mihttp.get<Articulo[]>(this.urlProducts + "?size=100")
  }

  getById(id: String): Observable <Articulo> {
    return this.Mihttp.get<Articulo>(this.urlProducts + "/" + id)
  }

  DeleteById(id: String): Observable <Articulo> {
    return this.Mihttp.delete<Articulo>(this.urlProducts + "/" + id) 
  }

  ModificarById(id: String, articulo: Articulo): Observable <Articulo>{
    return this.Mihttp.put<Articulo>(this.urlProducts + "/" + id, articulo)
  }

  Nuevo(articulo: Articulo) {
    return this.Mihttp.post<Articulo>(this.urlProducts, articulo)
  }

  getAllCategories(): Observable<Category[]> {
    return this.Mihttp.get<Category[]>(this.urlCategories)
  }

}
