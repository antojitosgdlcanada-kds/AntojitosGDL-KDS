const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const DB_FILE = "./database.json";
const MENU_FILE = "./menu.json";

// Cargar base de datos
let db = { ordenes: [] };
if (fs.existsSync(DB_FILE)) db = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));

// Guardar base
function guardarDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// 📦 Obtener menú
app.get("/menu", (req, res) => {
  const menu = JSON.parse(fs.readFileSync(MENU_FILE, "utf8"));
  res.json(menu);
});

// 📦 Enviar nueva orden
app.post("/orden", (req, res) => {
  const orden = { ...req.body, id: Date.now(), estado: "pendiente" };
  db.ordenes.push(orden);
  guardarDB();
  console.log("🧾 Nueva orden:", orden.mesa);
  res.json({ ok: true });
});

// 📋 Listar órdenes
app.get("/ordenes", (req, res) => {
  res.json(db.ordenes);
});

// ✅ Marcar orden lista
app.post("/orden-lista", (req, res) => {
  const id = req.body.id;
  const orden = db.ordenes.find(o => o.id === id);
  if (orden) orden.estado = "lista";
  guardarDB();
  res.json({ ok: true });
});

// 💰 Corte del día
app.post("/corte", (req, res) => {
  db.ordenes = [];
  guardarDB();
  res.json({ ok: true, msg: "Corte del día realizado." });
});

app.listen(PORT, () => console.log(`✅ Servidor AntojitosGDL-KDS en puerto ${PORT}`));
