import { Sequelize } from 'sequelize-typescript';

import { Alimento } from '../models/Alimento';
import { Refeicao } from '../models/Refeicao';
import { RefeicaoAlimento } from '../models/RefeicaoAlimento';
import { Usuario } from '../models/Usuario';


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'dietapp',
  models: [Usuario, Alimento, Refeicao, RefeicaoAlimento],
} as any);

export default sequelize;
