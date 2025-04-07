import { Request, Response } from 'express';
import { Refeicao } from '../models/Refeicao';
import { Alimento } from '../models/Alimento';

export const createRefeicao = async (req: Request, res: Response) => {
  try {
    const { nome, alimentos } = req.body;

    // Cria a refeição
    const refeicao = await Refeicao.create({ nome });

    if (alimentos && alimentos.length > 0) {
      // Busca os alimentos pelo ID
      const alimentosEncontrados = await Alimento.findAll({
        where: { id: alimentos },
      });

      // Associa os alimentos à refeição
      await refeicao.$set('alimentos', alimentosEncontrados);
    }

    res.status(201).json(refeicao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar refeição', error });
  }
};

export const getRefeicoes = async (req: Request, res: Response) => {
  try {
    const refeicoes = await Refeicao.findAll({ include: [Alimento] });
    res.json(refeicoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar refeições', error });
  }
};

export const getRefeicaoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const refeicao = await Refeicao.findByPk(id, { include: [Alimento] });

    if (!refeicao) {
      return res.status(404).json({ message: 'Refeição não encontrada' });
    }

    res.json(refeicao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar refeição', error });
  }
};
