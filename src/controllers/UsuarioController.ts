import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';


function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
  
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    let soma = 0;
    let resto;
  
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
  
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
  
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
  
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
  
    return resto === parseInt(cpf.substring(10, 11));
  }
  

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarSenhaForte(senha: string): boolean {
    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return senhaForteRegex.test(senha);
  }
  
export const UsuarioController = {
  async create(req: Request, res: Response) {
    try {
      const { nome, email, senha, cpf } = req.body;

      if (!nome || !email || !senha || !cpf) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      if (!validarEmail(email)) {
        return res.status(400).json({ message: 'E-mail inválido.' });
      }

      if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF inválido. Digite 11 números.' });
      }

      if (!validarSenhaForte(senha)) {
        return res.status(400).json({ message: 'Senha fraca! Use no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.' });
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
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
      }
      
      if (!validarEmail(email)) {
        return res.status(400).json({ message: 'E-mail inválido.' });
      }
      

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(400).json({ message: 'Usuário não encontrado.' });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.status(400).json({ message: 'Senha incorreta.' });
      }

      const token = jwt.sign({ id: usuario.id }, 'seuSegredoJWT', { expiresIn: '1h' });

      return res.json({ message: 'Login realizado com sucesso!', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const usuarios = await Usuario.findAll();
      return res.json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
  },
  async edit(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, senha, cpf } = req.body;
  
      if (req.user?.id !== Number(id)) {
        return res.status(403).json({ message: 'Você só pode editar o seu próprio perfil.' });
      }
  
      if (!nome || !senha || !cpf) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
  
      if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF inválido.' });
      }
  
      if (!validarSenhaForte(senha)) {
        return res.status(400).json({ message: 'Senha fraca! Use no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.' });
      }
      
  
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      await usuario.update({
        nome,
        senha: await bcrypt.hash(senha, 10),
        cpf
      });
  
      return res.json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
  }
};
