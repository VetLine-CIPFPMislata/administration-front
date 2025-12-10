import { Routes } from '@angular/router';
import { Articulos } from './Components/articulos/articulos';
import { VerArticulo } from './Components/ver-articulo/ver-articulo';
import { Borrar } from './Components/borrar/borrar';
import { Modificar } from './Components/modificar/modificar';
import { Nuevo } from './Components/nuevo/nuevo';
import { Login } from './Components/login/login';
import { Categorias } from './Components/categorias/categorias';
import { NuevoCategory } from './Components/nuevo-category/nuevo-category';

export const routes: Routes = [
    {path: "articulos", component: Articulos},
    {path: "category", component: Categorias},
    {path: "ver-articulo/:id", component: VerArticulo},
    {path: "borrar/:id", component: Borrar},
    {path: "modificar/:id", component: Modificar},
    {path: "nuevo", component: Nuevo},
    {path: "nuevo/category", component: NuevoCategory},
    {path: "login", component: Login},
];
