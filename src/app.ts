import express from 'express';
import 'dotenv/config';
import './models/Refeicao';
import './models/Alimento';
import './models/RefeicaoAlimento';
import './models/Usuario';

import { setupAssociations } from './models/associations';
import usuarioRoutes from './routes/usuario.routes';
import alimentoRoutes from './routes/alimento.routes';
import refeicaoRoutes from './routes/refeicao.routes';

const app = express();

app.use(express.json());

// Rotas
app.use('/api', usuarioRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/refeicoes', refeicaoRoutes);

setupAssociations();

export default app;
