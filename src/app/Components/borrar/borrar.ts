import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Http } from '../../Service/http';
import { Articulo } from '../../Modelos/Articulo';

@Component({
  selector: 'app-borrar',
  imports: [RouterLink],
  templateUrl: './borrar.html',
  styleUrl: './borrar.scss',
})
export class Borrar {
  articulo! : Articulo;
  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {}
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

  borrarArticulo(){
    if(this.articulo) {
      this.http.DeleteById(this.articulo.id).subscribe({
        next: () => {
          console.log('Artículo borrado con éxito');
        },
        error: (error) => {
          console.error('Error al borrar el artículo:', error);
        }
      });
    }
    this.http.getAll();
    this.router.navigate(['/articulos']);
}
}
