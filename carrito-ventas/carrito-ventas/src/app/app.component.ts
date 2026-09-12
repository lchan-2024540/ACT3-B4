import { Component } from '@angular/core';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { CarritoResumenComponent } from './components/carrito-resumen/carrito-resumen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListadoProductosComponent, CarritoResumenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titulo = 'Carrito de Ventas';
}
