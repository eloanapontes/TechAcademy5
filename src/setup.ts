import sequelize  from '../src/config/database';
import { setupAssociations } from '../src/models/associations';

// Configura as associações antes dos testes
setupAssociations();

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
