import { Router } from 'express';
import { AlimentoController } from '../controllers/AlimentoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, AlimentoController.create);
router.get('/', authMiddleware, AlimentoController.getAll);
router.get('/:id', authMiddleware, AlimentoController.getById);
router.put('/:id', authMiddleware, AlimentoController.update);
router.delete('/:id', authMiddleware, AlimentoController.delete);

export default router;
