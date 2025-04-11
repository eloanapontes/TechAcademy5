import sequelize  from '../src/config/database';
import { setupAssociations } from '../src/models/associations';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });


setupAssociations();

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});
