import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/producto.model';

/**
 * Recibe un item del carrito (producto + cantidad) y devuelve
 * el subtotal correspondiente: precio * cantidad.
 */
@Pipe({
  name: 'subtotal',
  standalone: true
})
export class SubtotalPipe implements PipeTransform {
  transform(item: ItemCarrito): number {
    return item.producto.precio * item.cantidad;
  }
}
