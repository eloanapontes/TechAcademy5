import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './models/Refeicao';
import './models/Alimento';
import './models/RefeicaoAlimento';
import './models/Usuario';
import './models/Dieta';

import usuarioRoutes from './routes/usuario.routes';
import alimentoRoutes from './routes/alimento.routes';
import refeicaoRoutes from './routes/refeicao.routes';
import dietaRoutes from './routes/dieta.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/refeicoes', refeicaoRoutes);
app.use('/api/dietas', dietaRoutes);

export default app;
