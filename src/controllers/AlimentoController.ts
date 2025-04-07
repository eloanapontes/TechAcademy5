import { Request, Response } from 'express';
import { Alimento } from '../models/Alimento';

export const AlimentoController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, calorias } = req.body;
      const alimento = await Alimento.create({ nome, calorias });
      res.status(201).json(alimento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar alimento' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, calorias } = req.body;

      const alimento = await Alimento.findByPk(id);
      if (!alimento) return res.status(404).json({ error: 'Alimento não encontrado' });

      await alimento.update({ nome, calorias });
      res.json(alimento);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar alimento' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const alimentos = await Alimento.findAll();
      res.json(alimentos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar alimentos' });
    }
  },
};
