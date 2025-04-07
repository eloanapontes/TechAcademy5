import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Refeicao } from './Refeicao';
import { RefeicaoAlimento } from './RefeicaoAlimento';

@Table({ tableName: 'alimentos' })
export class Alimento extends Model {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  calorias!: number;

  @BelongsToMany(() => Refeicao, () => RefeicaoAlimento)
  refeicoes!: Refeicao[];
}
