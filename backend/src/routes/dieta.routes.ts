import { Router } from 'express';
import { DietaController } from '../controllers/DietaController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/dietas', authMiddleware, DietaController.create);
router.get('/dietas', authMiddleware, DietaController.getAll);

export default router;
