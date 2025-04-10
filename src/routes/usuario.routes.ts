import { Router } from 'express';
import { criarUsuario } from '../controllers/UsuarioController';

const router = Router();

router.post('/usuarios', criarUsuario);

export default router;
