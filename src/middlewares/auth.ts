import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Usuario } from '../models/Usuario';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    
    if (!decoded.id) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    req.user = usuario; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token inválido.' });
  }
};
