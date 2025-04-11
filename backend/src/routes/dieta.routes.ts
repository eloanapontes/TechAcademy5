import { Router } from 'express';
import { DietaController } from '../controllers/DietaController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/', authMiddleware, DietaController.create);
router.get('/', authMiddleware, DietaController.getAll);

export default router;
