import { Request, Response } from 'express';
import { Refeicao } from '../models/Refeicao';
import { Alimento } from '../models/Alimento';

export const RefeicaoController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, alimentos } = req.body;

      const refeicao = await Refeicao.create({ nome });
      if (alimentos && alimentos.length > 0) {
        await refeicao.setAlimentos(alimentos);
      }

      res.status(201).json(refeicao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar refeição' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, alimentos } = req.body;

      const refeicao = await Refeicao.findByPk(id);
      if (!refeicao) return res.status(404).json({ error: 'Refeição não encontrada' });

      await refeicao.update({ nome });

      if (alimentos && alimentos.length > 0) {
        await refeicao.setAlimentos(alimentos);
      }

      res.json(refeicao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar refeição' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const refeicoes = await Refeicao.findAll({
        include: [{ model: Alimento }],
      });
      res.json(refeicoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar refeições' });
    }
  },
};
