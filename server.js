const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Servir las vistas principales
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

// Servir menú dinámico
app.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "menu.json"));
});
// --- RECIBIR ORDENES DE MESEROS ---
app.post("/orden", (req, res) => {
  console.log("📦 Nueva orden recibida:");
  console.log(req.body);

  // Aquí puedes guardar la orden en memoria, archivo o base de datos si luego lo deseas
  res.status(200).json({ success: true, message: "Orden recibida correctamente" });
});


app.listen(PORT, () => {
  console.log(`Servidor AntojitosGDL-KDS corriendo en puerto ${PORT}`);
});
