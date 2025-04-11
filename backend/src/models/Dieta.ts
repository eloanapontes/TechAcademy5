import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { Usuario } from './Usuario';
import { Refeicao } from './Refeicao';

@Table({ tableName: 'dietas' })
export class Dieta extends Model {
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

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  usuarioId!: number;

  @HasMany(() => Refeicao)
  refeicoes!: Refeicao[];
}
