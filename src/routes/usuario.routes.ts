import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/usuarios', UsuarioController.create);
router.post('/login', UsuarioController.login);
router.get('/usuarios', authMiddleware, UsuarioController.getAll);

export default router;
