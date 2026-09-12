import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';
import { ItemCarrito } from '../../models/producto.model';
import { SubtotalPipe } from '../../pipes/subtotal.pipe';
import { TotalCarritoPipe } from '../../pipes/total-carrito.pipe';
import { ConIvaPipe } from '../../pipes/con-iva.pipe';

@Component({
  selector: 'app-carrito-resumen',
  standalone: true,
  imports: [CommonModule, SubtotalPipe, TotalCarritoPipe, ConIvaPipe],
  templateUrl: './carrito-resumen.component.html',
  styleUrl: './carrito-resumen.component.css'
})
export class CarritoResumenComponent {
  // El componente solo se suscribe al estado que expone el servicio;
  // no mantiene su propia copia del carrito.
  carrito$: Observable<ItemCarrito[]>;

  constructor(private carritoService: CarritoService) {
    this.carrito$ = this.carritoService.carrito$;
  }

  incrementar(item: ItemCarrito): void {
    this.carritoService.actualizarCantidad(item.producto.id, item.cantidad + 1);
  }

  decrementar(item: ItemCarrito): void {
    this.carritoService.actualizarCantidad(item.producto.id, item.cantidad - 1);
  }

  eliminar(item: ItemCarrito): void {
    this.carritoService.eliminarProducto(item.producto.id);
  }

  vaciar(): void {
    this.carritoService.vaciarCarrito();
  }
}
