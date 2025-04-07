import { Alimento } from './Alimento';
import { Refeicao } from './Refeicao';
import { RefeicaoAlimento } from './RefeicaoAlimento';

Refeicao.belongsToMany(Alimento, { through: RefeicaoAlimento, foreignKey: 'refeicaoId' });
Alimento.belongsToMany(Refeicao, { through: RefeicaoAlimento, foreignKey: 'alimentoId' });
