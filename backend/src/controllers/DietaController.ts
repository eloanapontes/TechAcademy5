import { Request, Response } from 'express';
import { Dieta } from '../models/Dieta';
import { Refeicao } from '../models/Refeicao';
import { DietaRefeicao } from '../models/DietaRefeicao';

export const DietaController = {
    async create(req: Request, res: Response) {
        try {
          const { nome } = req.body;
      
          if (!nome) {
            return res.status(400).json({ error: 'Nome da dieta é obrigatório.' });
          }
      
          const novaDieta = await Dieta.create({
            nome,
            usuarioId: req.user!.id,
          });
      
          return res.status(201).json({ message: 'Dieta criada com sucesso!', dieta: novaDieta });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Erro ao criar dieta.' });
        }
      }
      ,

  async getAll(req: Request, res: Response) {
    try {
      const dietas = await Dieta.findAll({
        where: { usuarioId: req.user!.id },
        include: [
          {
            model: Refeicao,
            include: ['alimentos'],
            through: { attributes: [] }, // remove campos extras da tabela pivô
          },
        ],
      });

      res.json(dietas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar dietas.' });
    }
  },
};
