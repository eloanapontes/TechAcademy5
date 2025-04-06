import { Router } from 'express';
import pool from '../config/database'; // Caminho da sua conexão com o banco

const router = Router();

router.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

export default router;
