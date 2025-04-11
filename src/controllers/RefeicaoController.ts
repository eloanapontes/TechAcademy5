import { Request, Response } from 'express';
import { Refeicao } from '../models/Refeicao';
import { Alimento } from '../models/Alimento';

export const RefeicaoController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, alimentos } = req.body;

      if (!nome || !Array.isArray(alimentos)) {
        return res.status(400).json({ error: 'Nome e lista de alimentos são obrigatórios.' });
      }

      const refeicao = await Refeicao.create({ nome });

      if (alimentos.length > 0) {
        await refeicao.$set('alimentos', alimentos);
      }

      res.status(201).json({ message: 'Refeição criada com sucesso!', refeicao });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar refeição.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const offset = (Number(page) - 1) * Number(limit);

      const { rows: refeicoes, count: total } = await Refeicao.findAndCountAll({
        limit: Number(limit),
        offset,
        include: [Alimento],
      });

      const refeicoesComCalorias = refeicoes.map(refeicao => {
        const totalCalorias = refeicao.alimentos.reduce((acc, alimento) => acc + alimento.calorias, 0);
        return {
          ...refeicao.toJSON(),
          totalCalorias,
        };
      });

      res.json({
        total,
        paginaAtual: Number(page),
        totalPaginas: Math.ceil(total / Number(limit)),
        dados: refeicoesComCalorias,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar refeições.' });
    }
  },

  async updateAlimentos(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { alimentos } = req.body;

      const refeicao = await Refeicao.findByPk(id);
      if (!refeicao) {
        return res.status(404).json({ error: 'Refeição não encontrada.' });
      }

      await refeicao.$set('alimentos', alimentos);

      res.json({ message: 'Alimentos da refeição atualizados com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar alimentos da refeição.' });
    }
  },
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
  
      if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ error: 'Nome da refeição é obrigatório e deve ser uma string.' });
      }
  
      const refeicao = await Refeicao.findByPk(id);
      if (!refeicao) {
        return res.status(404).json({ error: 'Refeição não encontrada.' });
      }
  
      await refeicao.update({ nome });
  
      res.json({ message: 'Refeição atualizada com sucesso!', refeicao });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar refeição.' });
    }
  },
  
  

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const refeicao = await Refeicao.findByPk(id);
      if (!refeicao) {
        return res.status(404).json({ error: 'Refeição não encontrada.' });
      }

      await refeicao.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar refeição.' });
    }
  },
};
