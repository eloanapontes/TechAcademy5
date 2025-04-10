import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../models/Usuario';

export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf } = req.body;

    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      cpf,
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};
