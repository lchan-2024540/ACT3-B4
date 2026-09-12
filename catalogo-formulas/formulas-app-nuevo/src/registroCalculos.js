/**
 * REGISTRO DE CALCULOS (patron Observador)
 * Guarda cada calculo realizado y avisa a quien este escuchando.
 * No conoce ni modifica las formulas: solo recibe datos y los almacena.
 */
class RegistroCalculos {
  constructor() {
    this.historial = [];
    this.escuchas = [];
  }

  escuchar(funcion) {
    this.escuchas.push(funcion);
    return () => {
      this.escuchas = this.escuchas.filter((f) => f !== funcion);
    };
  }

  registrar(datos) {
    const entrada = { ...datos, calculadoEn: new Date().toISOString() };
    this.historial.push(entrada);
    this.escuchas.forEach((funcion) => funcion(entrada, this.historial));
    return entrada;
  }

  listar() {
    return [...this.historial];
  }

  vaciar() {
    this.historial = [];
  }
}

const registroCalculos = new RegistroCalculos();

// Escucha de ejemplo: imprime en consola cada vez que se guarda un calculo
registroCalculos.escuchar((entrada) => {
  console.log(`[REGISTRO] #${entrada.clave} ${entrada.titulo} -> ${entrada.resultado}`);
});

module.exports = { registroCalculos };
