import express from 'express';
import sequelize from './config/database';
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

app.use('/api', usuarioRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api', usuarioRoutes);
app.use('/api/refeicoes', refeicaoRoutes);


setupAssociations();

sequelize.sync({ alter: true })
  .then(() => {
    console.log('🎉 Banco de dados sincronizado!');
    app.listen(3000, () => {
      console.log('🚀 Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });
