# Carrito de Ventas con Observables y Pipes — Documentación

## 1. Arquitectura del flujo

El carrito se maneja con un único **servicio como fuente de verdad**: `CarritoService`.
Ningún componente guarda su propia copia del carrito; todos leen y escriben a través
del servicio.

```
ListadoProductosComponent  --agregarProducto()-->  CarritoService  --carrito$-->  CarritoResumenComponent
                                                    (BehaviorSubject)
```

- **`ListadoProductosComponent`**: muestra el catálogo estático de productos y, al
  hacer clic en "Agregar al carrito", llama a `carritoService.agregarProducto(producto)`.
- **`CarritoResumenComponent`**: se suscribe a `carrito$` mediante el pipe `async` en
  el template (no usa `.subscribe()` manual, así Angular gestiona la desuscripción).
  Desde aquí se puede subir/bajar cantidad o eliminar un producto.

## 2. Observables

`CarritoService` mantiene el estado en un `BehaviorSubject<ItemCarrito[]>` privado
(`carritoSubject`) y expone solo la versión de solo lectura `carrito$` (`Observable`).

Se eligió `BehaviorSubject` (y no `Subject`) porque:
- Tiene un valor inicial (`[]`), por lo que el resumen del carrito nunca queda sin dato.
- Cualquier componente que se suscriba después de que el carrito ya tenga productos
  recibe inmediatamente el último estado, no solo eventos futuros.

Cada operación (`agregarProducto`, `actualizarCantidad`, `eliminarProducto`,
`vaciarCarrito`) construye un **nuevo arreglo inmutable** a partir del estado actual
y lo emite con `carritoSubject.next(...)`. Esto dispara automáticamente la
actualización reactiva en cualquier componente suscrito, sin necesidad de eventos
`@Output` ni referencias directas entre componentes.

## 3. Pipes implementados

| Pipe | Tipo | Entrada | Salida |
|---|---|---|---|
| `subtotal` | Personalizado | Un `ItemCarrito` (producto + cantidad) | `precio * cantidad` |
| `totalCarrito` | Personalizado | El arreglo completo de `ItemCarrito[]` | Suma de todos los subtotales |
| `conIva` | Personalizado | Un monto (`number`) | Monto con 12% de IVA aplicado |

Se usan encadenados en el template para el total final:
`{{ (carrito | totalCarrito | conIva).toFixed(2) }}`

Este encadenado demuestra cómo los pipes pueden combinarse: el primero calcula el
total bruto y el segundo transforma ese resultado aplicando el impuesto.

## 4. Operaciones probadas

- Agregar el mismo producto varias veces incrementa su cantidad en vez de duplicar la fila.
- Cambiar la cantidad con los botones +/- recalcula subtotal y total en tiempo real.
- Bajar la cantidad a 0 elimina el producto automáticamente (`actualizarCantidad`
  delega en `eliminarProducto`).
- Eliminar un producto y vaciar el carrito actualizan ambos paneles de forma
  reactiva, sin recargar la página.

## 5. Cómo ejecutar

```bash
pnpm install
pnpm start
```

Luego abrir `http://localhost:4200`.
