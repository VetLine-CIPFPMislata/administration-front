import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../Modelos/Articulo';

@Injectable({
  providedIn: 'root',
})
export class Http {
  constructor(private Mihttp: HttpClient){}

  urlProducts = ""

  getAll(): Observable <Articulo[]> {
    return this.Mihttp.get<Articulo[]>(this.urlProducts)
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

}
