import { Request, Response } from 'express';
import { Alimento } from '../models/Alimento';

export const AlimentoController = {

  async create(req: Request, res: Response) {
    try {
      const { nome, calorias } = req.body;
  
      if (!nome || !calorias) {
        return res.status(400).json({ message: 'Nome e calorias são obrigatórios.' });
      }
  
      const novoAlimento = await Alimento.create({
        nome,
        calorias,
        usuarioId: req.user!.id,
      });
  
      res.status(201).json(novoAlimento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar alimento.' });
    }
  }
  ,

  async getAll(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10 } = req.query;
  
      const offset = (Number(page) - 1) * Number(limit);
  
      const { count: total, rows: alimentos } = await Alimento.findAndCountAll({
        where: { usuarioId: req.user!.id },
        limit: Number(limit),
        offset
      });
  
      res.status(200).json({
        total,
        paginaAtual: Number(page),
        totalPaginas: Math.ceil(total / Number(limit)),
        dados: alimentos
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar alimentos.' });
    }
  }
  ,


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
  
      const alimento = await Alimento.findOne({
        where: { id, usuarioId: req.user!.id }
      });
  
      if (!alimento) {
        return res.status(404).json({ error: 'Alimento não encontrado.' });
      }
  
      await alimento.update({ nome, calorias });
  
      res.status(200).json(alimento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar alimento.' });
    }
  }
,

async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const alimento = await Alimento.findOne({
      where: { id, usuarioId: req.user!.id }
    });

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
