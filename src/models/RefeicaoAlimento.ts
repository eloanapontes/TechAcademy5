import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Refeicao } from './Refeicao';
import { Alimento } from './Alimento';

@Table({
  tableName: 'refeicoes_alimentos',
  timestamps: false,
})
export class RefeicaoAlimento extends Model {
  @ForeignKey(() => Refeicao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  refeicaoId!: number;

  @ForeignKey(() => Alimento)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  alimentoId!: number;
}
