import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'refeicao_alimentos',
  timestamps: false,
})
export class RefeicaoAlimento extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  refeicaoId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  alimentoId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantidade!: number;
}
