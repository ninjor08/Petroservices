import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { Productos } from '../../services/productos';

@Component({
  selector: 'app-admin',
  imports: [RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {

  productos: Producto[] = [];
  mensajeError = '';

  private productosService = inject(Productos);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (datos) => {
        this.productos = datos;
        this.mensajeError = '';
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.mensajeError = 'No se pudieron cargar los productos.';
        this.cdr.markForCheck();
      }
    });
  }

  eliminarProducto(id: string): void {
    const confirmar = confirm('¿Está seguro de eliminar este producto?');

    if (!confirmar) {
      return;
    }

    this.mensajeError = '';

    this.productosService.eliminarProducto(id).subscribe({
      next: () => {
        this.cargarProductos();
      },
      error: (error) => {
        console.error('Error al eliminar producto:', error);
        this.mensajeError = 'No se pudo eliminar el producto.';
        this.cdr.markForCheck();
      }
    });
  }

}
