const express = require('express');
const path = require('path');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Guardar un registro de ánimo
app.post('/api/animo', async (req, res) => {
  const { puntuacion, estado_animo, comentario } = req.body;

  if (!puntuacion || !estado_animo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const { data, error } = await supabase
      .from('registros')
      .insert([
        { 
          estado_animo, 
          puntuacion, 
          comentario: comentario || null 
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ message: 'Registro guardado', data: data[0] });
  } catch (error) {
    console.error('Error en Supabase:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener el historial de registros
app.get('/api/animo', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('registros')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error en Supabase:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});