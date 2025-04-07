import { Sequelize } from 'sequelize-typescript';

import { Alimento } from '../models/Alimento';
import { Refeicao } from '../models/Refeicao';
import { RefeicaoAlimento } from '../models/RefeicaoAlimento';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'dietapp',
  models: [Alimento, Refeicao, RefeicaoAlimento],
} as any); // <- Aqui forçamos o tipo se tiver conflito de tipos chatos

export default sequelize;
