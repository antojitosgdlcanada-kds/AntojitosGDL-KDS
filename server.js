// ====== Antojitos Guadalajara KDS ======
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Archivos temporales en memoria ---
let ordenes = [];

// ====== Páginas ======
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/comandas", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comandas.html"));
});

app.get("/cocina", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cocina.html"));
});

app.get("/bar", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "bar.html"));
});

app.get("/caja", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "caja.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// ====== API Ordenes ======
app.post("/orden", (req, res) => {
  const orden = req.body;
  if (!orden || !orden.mesa || !orden.items) {
    return res.status(400).json({ error: "Orden inválida" });
  }

  orden.id = Date.now();
  orden.estado = "pendiente";
  ordenes.push(orden);

  console.log("📦 Nueva orden recibida:", orden);
  res.json({ ok: true, mensaje: "Orden recibida" });
});

app.get("/ordenes", (req, res) => {
  res.json(ordenes);
});

app.post("/orden/listo/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const orden = ordenes.find(o => o.id === id);
  if (orden) {
    orden.estado = "listo";
    console.log("✅ Orden lista:", orden.id);
    res.json({ ok: true });
  } else {
    res.status(404).json({ error: "Orden no encontrada" });
  }
});

// ====== Iniciar Servidor ======
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor KDS en puerto ${PORT}`));
