import app from './app';
import sequelize from './config/database';

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
