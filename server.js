const express = require('express');
const path = require('path');
const getDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Guardar registro
app.post('/api/animo', async (req, res) => {
  const { puntuacion, estado_animo, comentario } = req.body;

  if (!puntuacion || !estado_animo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const db = await getDB();
    const result = await db.run(
      `INSERT INTO registros (estado_animo, puntuacion, comentario) VALUES (?, ?, ?)`,
      [estado_animo, puntuacion, comentario || null]
    );

    res.status(201).json({ message: 'Registro guardado', id: result.lastID });
  } catch (error) {
    console.error('Error en BD:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener historial
app.get('/api/animo', async (req, res) => {
  try {
    const db = await getDB();
    const rows = await db.all('SELECT * FROM registros ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error en BD:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});