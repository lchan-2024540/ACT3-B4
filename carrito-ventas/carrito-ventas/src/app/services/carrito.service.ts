import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrito, Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  // Catálogo estático de productos disponibles para la venta
  private productosDisponibles: Producto[] = [
    { id: 1, nombre: 'Teclado mecánico', precio: 250 },
    { id: 2, nombre: 'Mouse inalámbrico', precio: 120 },
    { id: 3, nombre: 'Monitor 24"', precio: 950 },
    { id: 4, nombre: 'Audífonos USB', precio: 180 },
    { id: 5, nombre: 'Webcam HD', precio: 210 }
  ];

  // El carrito vive como estado privado; solo se expone como Observable de solo lectura
  private carritoSubject = new BehaviorSubject<ItemCarrito[]>([]);
  carrito$: Observable<ItemCarrito[]> = this.carritoSubject.asObservable();

  obtenerProductosDisponibles(): Producto[] {
    return this.productosDisponibles;
  }

  private obtenerEstadoActual(): ItemCarrito[] {
    return this.carritoSubject.getValue();
  }

  agregarProducto(producto: Producto): void {
    const carritoActual = this.obtenerEstadoActual();
    const itemExistente = carritoActual.find((item) => item.producto.id === producto.id);

    let nuevoCarrito: ItemCarrito[];
    if (itemExistente) {
      nuevoCarrito = carritoActual.map((item) =>
        item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { producto, cantidad: 1 }];
    }

    this.carritoSubject.next(nuevoCarrito);
  }

  actualizarCantidad(idProducto: number, cantidad: number): void {
    if (cantidad <= 0) {
      this.eliminarProducto(idProducto);
      return;
    }

    const nuevoCarrito = this.obtenerEstadoActual().map((item) =>
      item.producto.id === idProducto ? { ...item, cantidad } : item
    );

    this.carritoSubject.next(nuevoCarrito);
  }

  eliminarProducto(idProducto: number): void {
    const nuevoCarrito = this.obtenerEstadoActual().filter(
      (item) => item.producto.id !== idProducto
    );
    this.carritoSubject.next(nuevoCarrito);
  }

  vaciarCarrito(): void {
    this.carritoSubject.next([]);
  }
}
