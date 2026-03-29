const express = require("express");
const app = express();
const pool = require("./db");

const menuRoutes = require("./routes/menu"); // ganti nama

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API jalan!");
});

// endpoint juga ganti
app.use("/api/menu", menuRoutes);

// tes koneksi database
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Koneksi gagal:", err);
  } else {
    console.log("Database terkoneksi:", result.rows);
  }
});

app.listen(5000, () => {
  console.log("Server jalan di http://localhost:5000");
});
