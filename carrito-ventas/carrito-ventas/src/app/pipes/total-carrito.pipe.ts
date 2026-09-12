import { Pipe, PipeTransform } from '@angular/core';
import { ItemCarrito } from '../models/producto.model';

/**
 * Recibe la lista completa de items del carrito y devuelve
 * la suma de todos los subtotales (precio * cantidad de cada uno).
 */
@Pipe({
  name: 'totalCarrito',
  standalone: true
})
export class TotalCarritoPipe implements PipeTransform {
  transform(items: ItemCarrito[]): number {
    return items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }
}
