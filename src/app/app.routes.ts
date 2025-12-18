import { Routes } from '@angular/router';
import { Articulos } from './Components/articulos/articulos';
import { VerArticulo } from './Components/ver-articulo/ver-articulo';
import { Borrar } from './Components/borrar/borrar';
import { Modificar } from './Components/modificar/modificar';
import { Nuevo } from './Components/nuevo/nuevo';
import { Login } from './Components/login/login';
import { Categorias } from './Components/categorias/categorias';
import { NuevoCategory } from './Components/nuevo-category/nuevo-category';
import { authGuard } from './guards/auth.guard';
import { EditarCategoria } from './Components/editar-categoria/editar-categoria';

export const routes: Routes = [
    {path: "articulos", component: Articulos, canActivate: [authGuard]},
    {path: "category", component: Categorias, canActivate: [authGuard]},
    {path: "ver-articulo/:id", component: VerArticulo, canActivate: [authGuard]},
    {path: "borrar/:id", component: Borrar, canActivate: [authGuard]},
    {path: "modificar/:id", component: Modificar, canActivate: [authGuard]},
    {path: "nuevo", component: Nuevo, canActivate: [authGuard]},
    {path: "nuevo/category", component: NuevoCategory, canActivate: [authGuard]},
    {path: "category/:id", component: EditarCategoria, canActivate: [authGuard]},
    {path: "login", component: Login}, 
    {path: "**", redirectTo: "/login"}
];
