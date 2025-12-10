import { Component } from '@angular/core';
import { Articulo } from '../../Modelos/Articulo';
import { Category } from '../../Modelos/Category';
import { Http } from '../../Service/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  imports: [RouterLink, FormsModule],
  templateUrl: './nuevo.html',
  styleUrl: './nuevo.scss',
})
export class Nuevo {
  categorias: Category[] = [];
  selectedCategoryId: string = '';
  
  articulo: Articulo = {
    id: '',
    name: '',
    description: '',
    category: { id: '', name: '', description: '' },
    image: '',
    quantity: 0,
    price: 0,
    discountPercentage: 0,
    basePrice: 0,  
    rating: 0
  };

  constructor(private http: Http, private router: Router) {}

  ngOnInit(){
    this.http.getAllCategories().subscribe({
      next: (datos) => {
        if (Array.isArray(datos)) {
          this.categorias = datos;
        } else {
          this.categorias = [];
        }
      },
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }

  crearArticulo() {
    const categoryId = Number(this.articulo.category.id);
    const selectedCategory = this.categorias.find(cat => Number(cat.id) === categoryId);
  
    
    const basePriceNum = Number(this.articulo.basePrice);
    
    
    const articulo = {
      name: this.articulo.name,
      productDescription: this.articulo.description,
      category: selectedCategory,
      pictureProduct: this.articulo.image,
      quantity: Number(this.articulo.quantity),
      basePrice: basePriceNum,
      discountPercentage: Number(this.articulo.discountPercentage)
    };
    
    this.http.Nuevo(articulo as any).subscribe({
      next: () => {
        console.log('Artículo creado con éxito');
        alert('Artículo creado con éxito');
        this.router.navigate(['/articulos']);
      },
      error: (error) => {
        console.error('Error al crear artículo:', error);
        alert('Error al crear artículo. Revisa la consola.');
      }
    });
  }
}
