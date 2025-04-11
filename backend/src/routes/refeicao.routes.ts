import { Router } from 'express';
import { RefeicaoController } from '../controllers/RefeicaoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, RefeicaoController.create);
router.get('/', authMiddleware, RefeicaoController.getAll);
router.put('/:id/alimentos', authMiddleware, RefeicaoController.updateAlimentos);
router.delete('/:id', authMiddleware, RefeicaoController.delete);

export default router;
