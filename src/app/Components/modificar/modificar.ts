import { Component } from '@angular/core';
import { Articulo } from '../../Modelos/Articulo';
import { Category } from '../../Modelos/Category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  categorias: Category[] = [];
  selectedCategoryId: any = '';
  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit(){
    this.http.getAllCategories().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => console.log(error)
    });

    this.route.params.subscribe(
      params => {
        const id = params['id']
        if(id) {
          this.http.getById(id).subscribe({
            next: (articulo) => {
              this.articulo = articulo;
              this.selectedCategoryId = articulo.category.id;
            },
            error: (error) => console.log(error)
          })
        }
      })
  }
  modificarArticulo(){
    if(this.articulo) {
      const categoriaSeleccionada = this.categorias.find(cat => cat.id == this.selectedCategoryId);
      if (categoriaSeleccionada) {
        this.articulo.category = categoriaSeleccionada;
      }
      
      this.http.ModificarById(this.articulo.id, this.articulo).subscribe({
        next: () => {
          console.log('Artículo modificado con éxito');
        },
        error: (error) => {
          console.error('Error al modificar el artículo:', error);
        }
      });
  }
  this.router.navigate(['/articulos']);
}
}
