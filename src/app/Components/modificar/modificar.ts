import { Component } from '@angular/core';
import { Articulo } from '../../Modelos/Articulo';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Http } from '../../Service/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  imports: [RouterLink, FormsModule],
  templateUrl: './modificar.html',
  styleUrl: './modificar.scss',
})
export class Modificar {
  articulo!: Articulo;
  constructor(private http: Http, private route: ActivatedRoute) {}
  
  ngOnInit(){
    this.route.params.subscribe(
      params => {
        const id = params['id']
        if(id) {
          this.http.getById(id).subscribe({
            next: (articulo) => this.articulo = articulo,
            error: (error) => console.log(error)
          })
        }
      })
  }
  modificarArticulo(){
    if(this.articulo) {
      this.http.ModificarById(this.articulo.id, this.articulo).subscribe({
        next: () => {
          console.log('Artículo modificado con éxito');
        },
        error: (error) => {
          console.error('Error al modificar el artículo:', error);
        }
      });
  }
}
}
