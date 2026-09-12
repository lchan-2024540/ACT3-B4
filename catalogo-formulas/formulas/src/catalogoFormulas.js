/**
 * CATALOGO DE FORMULAS
 * Cada entrada agrupa: el calculo puro (calcular) + los datos de ejemplo
 * (valoresPrueba) + la informacion para mostrar en pantalla.
 * El calculo nunca se altera para agregar registro o efectos secundarios;
 * eso queda a cargo de RegistroCalculos, en otro archivo.
 */

function crearFormula({ clave, area, titulo, notacion, calcular, valoresPrueba }) {
  return { clave, area, titulo, notacion, calcular, valoresPrueba };
}

const catalogo = [
  crearFormula({
    clave: 1,
    area: "Geometria",
    titulo: "Area de un circulo",
    notacion: "A = pi * r^2",
    calcular: (radio) => Math.PI * radio ** 2,
    valoresPrueba: [5],
  }),
  crearFormula({
    clave: 2,
    area: "Cinematica",
    titulo: "Velocidad media",
    notacion: "v = d / t",
    calcular: (distancia, tiempo) => distancia / tiempo,
    valoresPrueba: [100, 20],
  }),
  crearFormula({
    clave: 3,
    area: "Dinamica",
    titulo: "Segunda ley de Newton",
    notacion: "F = m * a",
    calcular: (masa, aceleracion) => masa * aceleracion,
    valoresPrueba: [10, 9.8],
  }),
  crearFormula({
    clave: 4,
    area: "Energia",
    titulo: "Energia cinetica",
    notacion: "Ec = 1/2 * m * v^2",
    calcular: (masa, velocidad) => 0.5 * masa * velocidad ** 2,
    valoresPrueba: [2, 15],
  }),
  crearFormula({
    clave: 5,
    area: "Electricidad",
    titulo: "Ley de Ohm",
    notacion: "V = I * R",
    calcular: (corriente, resistencia) => corriente * resistencia,
    valoresPrueba: [3, 8],
  }),
  crearFormula({
    clave: 6,
    area: "Cinematica",
    titulo: "Caida libre",
    notacion: "h = 1/2 * g * t^2",
    calcular: (gravedad, tiempo) => 0.5 * gravedad * tiempo ** 2,
    valoresPrueba: [9.8, 4],
  }),
  crearFormula({
    clave: 7,
    area: "Geometria",
    titulo: "Teorema de Pitagoras",
    notacion: "c = sqrt(a^2 + b^2)",
    calcular: (catetoA, catetoB) => Math.sqrt(catetoA ** 2 + catetoB ** 2),
    valoresPrueba: [3, 4],
  }),
  crearFormula({
    clave: 8,
    area: "Finanzas",
    titulo: "Interes compuesto",
    notacion: "M = P * (1 + r)^t",
    calcular: (capital, tasa, periodos) => capital * (1 + tasa) ** periodos,
    valoresPrueba: [1000, 0.05, 10],
  }),
  crearFormula({
    clave: 9,
    area: "Fisica general",
    titulo: "Densidad",
    notacion: "d = m / v",
    calcular: (masa, volumen) => masa / volumen,
    valoresPrueba: [500, 25],
  }),
  crearFormula({
    clave: 10,
    area: "Gravitacion",
    titulo: "Ley de gravitacion universal",
    notacion: "F = G * m1 * m2 / r^2",
    calcular: (masa1, masa2, distancia) => {
      const CONSTANTE_G = 6.674e-11;
      return (CONSTANTE_G * masa1 * masa2) / distancia ** 2;
    },
    valoresPrueba: [5.972e24, 70, 6371000],
  }),
];

function listarCatalogo() {
  return catalogo.map(({ clave, area, titulo, notacion, valoresPrueba }) => ({
    clave,
    area,
    titulo,
    notacion,
    valoresPrueba,
  }));
}

function buscarPorClave(clave) {
  return catalogo.find((formula) => formula.clave === clave);
}

module.exports = { catalogo, listarCatalogo, buscarPorClave };
