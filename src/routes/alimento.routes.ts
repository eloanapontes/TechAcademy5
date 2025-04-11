import { Router } from 'express';
import { AlimentoController } from '../controllers/AlimentoController';

const router = Router();

router.post('/', AlimentoController.create);
router.get('/', AlimentoController.getAll);
router.get('/:id', AlimentoController.getById);
router.put('/:id', AlimentoController.update);
router.delete('/:id', AlimentoController.delete);

export default router;
