import express from 'express';
import sequelize from './config/database';

// Importa os models
import './models/Refeicao';
import './models/Alimento';
import './models/RefeicaoAlimento';

// Importa a função de associações
import { setupAssociations } from './models/associations';

const app = express();

app.use(express.json());

// Configura as associações
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
