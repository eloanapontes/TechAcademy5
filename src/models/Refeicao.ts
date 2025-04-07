import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Alimento } from './Alimento';
import { RefeicaoAlimento } from './RefeicaoAlimento';

@Table({ tableName: 'refeicoes' })
export class Refeicao extends Model {
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

  @BelongsToMany(() => Alimento, () => RefeicaoAlimento)
  alimentos!: Alimento[];
}
