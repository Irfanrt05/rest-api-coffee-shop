const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v5: uuidv5 } = require("uuid");
const NAMESPACE = uuidv5.DNS;

// GET semua menu
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM menu");
  res.json(result.rows);
});

// GET menu by ID
router.get("/:id", async (req, res) => {
  const result = await pool.query("SELECT * FROM menu WHERE id = $1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
});

// POST tambah menu
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    const id = uuidv5(name + Date.now(), NAMESPACE);

    const result = await pool.query(
      "INSERT INTO menu (id, name, price) VALUES ($1, $2, $3) RETURNING *",
      [id, name, price],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error tambah menu" });
  }
});

// PUT update menu
router.put("/:id", async (req, res) => {
  const { name, price } = req.body;

  const result = await pool.query(
    "UPDATE menu SET name=$1, price=$2 WHERE id=$3 RETURNING *",
    [name, price, req.params.id],
  );

  res.json(result.rows[0]);
});

// DELETE menu
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM menu WHERE id=$1", [req.params.id]);

  res.json({ message: "Menu berhasil dihapus" });
});

module.exports = router;
