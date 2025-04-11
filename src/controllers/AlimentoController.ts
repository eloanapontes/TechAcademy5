import { Request, Response } from 'express';
import { Alimento } from '../models/Alimento';

export const AlimentoController = {

  async create(req: Request, res: Response) {
    try {
      const { nome, calorias } = req.body;

      if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ error: 'Nome do alimento é obrigatório e deve ser uma string.' });
      }

      if (calorias === undefined || isNaN(calorias) || calorias < 0) {
        return res.status(400).json({ error: 'Calorias devem ser um número positivo.' });
      }

      const alimentoExistente = await Alimento.findOne({ where: { nome } });
      if (alimentoExistente) {
        return res.status(400).json({ error: 'Já existe um alimento com esse nome.' });
      }

      const alimento = await Alimento.create({ nome, calorias });
      res.status(201).json(alimento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

 async getAll(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const alimentos = await Alimento.findAndCountAll({
      limit: Number(limit),
      offset,
    });

    res.json({
      total: alimentos.count,
      paginaAtual: Number(page),
      totalPaginas: Math.ceil(alimentos.count / Number(limit)),
      dados: alimentos.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar alimentos.' });
  }
},


  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alimento = await Alimento.findByPk(id);

      if (!alimento) {
        return res.status(404).json({ error: 'Alimento não encontrado.' });
      }

      res.json(alimento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, calorias } = req.body;

      const alimento = await Alimento.findByPk(id);
      if (!alimento) {
        return res.status(404).json({ error: 'Alimento não encontrado.' });
      }

      await alimento.update({ nome, calorias });
      res.json(alimento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar alimento.' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const alimento = await Alimento.findByPk(id);
      if (!alimento) {
        return res.status(404).json({ error: 'Alimento não encontrado.' });
      }

      await alimento.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar alimento.' });
    }
  }
};
