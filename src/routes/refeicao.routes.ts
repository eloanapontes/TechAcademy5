import { Router } from 'express';
import { RefeicaoController } from '../controllers/RefeicaoController';

const router = Router();

router.post('/', RefeicaoController.create);
router.get('/', RefeicaoController.getAll);
router.put('/:id/alimentos', RefeicaoController.updateAlimentos);
router.delete('/:id', RefeicaoController.delete);

export default router;
