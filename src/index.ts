import express from 'express';
import sequelize from './config/database';

import './models/Refeicao';
import './models/Alimento';
import './models/RefeicaoAlimento';

import { setupAssociations } from './models/associations';

const app = express();

app.use(express.json());

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
