
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  contrasena = '';
  mensajeError = '';

  private auth = inject(Auth);
  private router = inject(Router);

  iniciarSesion(): void {
    if (this.auth.login(this.usuario, this.contrasena)) {
      this.mensajeError = '';

      if (this.auth.esAdministrador()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/catalogo']);
      }

    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos';
    }
  }

}
