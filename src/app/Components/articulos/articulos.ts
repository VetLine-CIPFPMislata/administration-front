import { Component } from '@angular/core';
import { Http } from '../../Service/http';
import { Articulo } from '../../Modelos/Articulo';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-articulos',
  imports: [RouterLink],
  templateUrl: './articulos.html',
  styleUrl: './articulos.scss',
})
export class Articulos {

  articulos: Articulo[] = [];
  constructor(private http: Http) {}

  ngOnInit(){
    this.http.getAll().subscribe({
      next: (datos) => {
        this.articulos = Array.isArray(datos) ? datos : (datos as any).content || (datos as any).data || [];
      },
      error: (error) => { console.error('Error completo:', error)}
    });
  }
}
