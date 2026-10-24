import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto';
import { Productos } from '../../services/productos';

@Component({
  selector: 'app-formulario-producto',
  imports: [FormsModule, RouterLink],
  templateUrl: './formulario-producto.html',
  styleUrl: './formulario-producto.css'
})
export class FormularioProducto implements OnInit {

  producto: Producto = {
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0
  };

  mensajeError = '';

  private productosService = inject(Productos);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);
  private detector = inject(ChangeDetectorRef);

  idProducto = this.ruta.snapshot.paramMap.get('id');
  esEdicion = this.idProducto !== null;

  ngOnInit(): void {
    if (this.idProducto !== null) {
      this.cargarProducto(this.idProducto);
    }
  }

  cargarProducto(id: string): void {
    this.productosService.obtenerProducto(id).subscribe({
      next: (datos) => {
        this.producto = datos;
        this.detector.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar producto:', error);
        this.mensajeError = 'No se pudo cargar el producto.';
        this.detector.markForCheck();
      }
    });
  }

  guardarProducto(): void {
    this.mensajeError = '';

    if (this.esEdicion) {

      this.productosService.actualizarProducto(this.producto).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.mensajeError = 'No se pudo actualizar el producto.';
          this.detector.markForCheck();
        }
      });

    } else {

      this.productosService.agregarProducto(this.producto).subscribe({
        next: () => {
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.mensajeError = 'No se pudo guardar el producto.';
          this.detector.markForCheck();
        }
      });

    }
  }

}
