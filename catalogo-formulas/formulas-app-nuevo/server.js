const express = require("express");
const path = require("path");
const { catalogo, listarCatalogo, buscarPorClave } = require("./src/catalogoFormulas");
const { registroCalculos } = require("./src/registroCalculos");

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Lista las 10 formulas disponibles
app.get("/api/formulas", (req, res) => {
  res.json(listarCatalogo());
});

// Ejecuta UNA formula con sus valores de prueba y guarda el resultado en el registro
app.get("/api/formulas/:id/ejecutar", (req, res) => {
  const clave = Number(req.params.id);
  const formula = buscarPorClave(clave);
  if (!formula) return res.status(404).json({ error: "Formula no encontrada" });

  const resultado = formula.calcular(...formula.valoresPrueba);

  const entrada = registroCalculos.registrar({
    clave: formula.clave,
    titulo: formula.titulo,
    notacion: formula.notacion,
    valoresPrueba: formula.valoresPrueba,
    resultado,
  });

  res.json(entrada);
});

// Ejecuta las 10 formulas de una vez
app.get("/api/formulas/ejecutar-todas", (req, res) => {
  const entradas = catalogo.map((formula) => {
    const resultado = formula.calcular(...formula.valoresPrueba);
    return registroCalculos.registrar({
      clave: formula.clave,
      titulo: formula.titulo,
      notacion: formula.notacion,
      valoresPrueba: formula.valoresPrueba,
      resultado,
    });
  });
  res.json(entradas);
});

// Devuelve el historial acumulado del registro
app.get("/api/resultados", (req, res) => {
  res.json(registroCalculos.listar());
});

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
