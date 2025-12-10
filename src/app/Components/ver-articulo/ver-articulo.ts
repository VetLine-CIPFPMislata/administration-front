import { Component } from '@angular/core';
import { Http } from '../../Service/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Articulo } from '../../Modelos/Articulo';

@Component({
  selector: 'app-ver-articulo',
  imports: [RouterLink],
  templateUrl: './ver-articulo.html',
  styleUrl: './ver-articulo.scss',
})
export class VerArticulo {
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
  }

