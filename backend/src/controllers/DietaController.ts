import { Request, Response } from 'express';
import { Dieta } from '../models/Dieta';
import { Refeicao } from '../models/Refeicao';

export const DietaController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, refeicoes } = req.body;

      if (!nome || !Array.isArray(refeicoes) || refeicoes.length === 0) {
        return res.status(400).json({ error: 'Nome da dieta e pelo menos uma refeição são obrigatórios.' });
      }

      const dieta = await Dieta.create({
        nome,
        usuarioId: req.user!.id,
      });

      for (const refeicao of refeicoes) {
        const novaRefeicao = await Refeicao.create({
          nome: refeicao.nome,
          usuarioId: req.user!.id,
          dietaId: dieta.id,
        });

        if (refeicao.alimentos && refeicao.alimentos.length > 0) {
          await novaRefeicao.$set('alimentos', refeicao.alimentos);
        }
      }

      res.status(201).json({ message: 'Dieta criada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar dieta.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const dietas = await Dieta.findAll({
        where: { usuarioId: req.user!.id },
        include: {
          model: Refeicao,
          include: ['alimentos'],
        },
      });

      res.json(dietas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar dietas.' });
    }
  }
};
