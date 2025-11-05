// --- Antojitos Guadalajara KDS Server ---
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- AUTENTICACIÓN SIMPLE ---
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("🔒 Acceso restringido. Ingresa tus credenciales.");
  }

  const encoded = authHeader.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString();
  const [user, pass] = decoded.split(":");

  // 👇 Cambia estas credenciales si deseas
  if (user === "antojitosGDL" && pass === "TamaldeKGta") {
    next();
  } else {
    res.setHeader("WWW-Authenticate", "Basic");
    res.status(401).send("❌ Credenciales inválidas.");
  }
};

// Aplica autenticación a las secciones principales
app.use(["/comandas", "/cocina", "/bar", "/caja", "/admin"], auth);

// --- RUTAS DE PÁGINAS ---
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

// --- RECIBIR ORDENES DE MESEROS ---
app.post("/orden", (req, res) => {
  console.log("📦 Nueva orden recibida:");
  console.log(req.body);
  res.status(200).json({ success: true, message: "Orden recibida correctamente" });
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor KDS Antojitos corriendo en puerto ${PORT}`);
});
