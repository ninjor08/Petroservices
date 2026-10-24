import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  login(usuario: string, contrasena: string): boolean {

    if (usuario === 'admin' && contrasena === 'admin123') {
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('rol', 'admin');
      return true;
    }

    if (usuario === 'operador' && contrasena === 'operador123') {
      localStorage.setItem('usuario', usuario);
      localStorage.setItem('rol', 'estandar');
      return true;
    }

    return false;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
  }

  estaAutenticado(): boolean {
    return localStorage.getItem('usuario') !== null;
  }

  esAdministrador(): boolean {
    return localStorage.getItem('rol') === 'admin';
  }

}
