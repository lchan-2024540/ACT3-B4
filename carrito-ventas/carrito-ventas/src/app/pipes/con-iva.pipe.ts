import { Pipe, PipeTransform } from '@angular/core';

const PORCENTAJE_IVA = 0.12;

/**
 * Pipe adicional: aplica el IVA (12%) a un monto ya calculado.
 * Se usa sobre el resultado del pipe "totalCarrito" para mostrar
 * el total final que pagaría el cliente.
 */
@Pipe({
  name: 'conIva',
  standalone: true
})
export class ConIvaPipe implements PipeTransform {
  transform(monto: number): number {
    return monto * (1 + PORCENTAJE_IVA);
  }
}
