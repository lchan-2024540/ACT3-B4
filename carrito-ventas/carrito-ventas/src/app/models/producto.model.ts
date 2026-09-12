export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
