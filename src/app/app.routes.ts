import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Catalogo } from './pages/catalogo/catalogo';
import { Admin } from './pages/admin/admin';
import { FormularioProducto } from './pages/formulario-producto/formulario-producto';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'catalogo', component: Catalogo },

  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard]
  },

  {
    path: 'productos/nuevo',
    component: FormularioProducto,
    canActivate: [authGuard]
  },

  {
    path: 'productos/editar/:id',
    component: FormularioProducto,
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
