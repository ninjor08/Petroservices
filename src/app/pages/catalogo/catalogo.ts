import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Producto } from '../../models/producto';
import { Productos } from '../../services/productos';

@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  productos: Producto[] = [];

  private productosService = inject(Productos);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (datos) => {
        this.productos = datos;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

}
