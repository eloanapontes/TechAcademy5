import { Refeicao } from './Refeicao';
import { Alimento } from './Alimento';
import { RefeicaoAlimento } from './RefeicaoAlimento';

export function setupAssociations() {
  Refeicao.belongsToMany(Alimento, { through: RefeicaoAlimento, foreignKey: 'refeicaoId' });
  Alimento.belongsToMany(Refeicao, { through: RefeicaoAlimento, foreignKey: 'alimentoId' });
}
