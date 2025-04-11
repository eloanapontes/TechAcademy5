import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Refeicao } from './Refeicao';
import { Alimento } from './Alimento';

@Table({ tableName: 'usuarios' })
export class Usuario extends Model {
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
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  senha!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  cpf!: string;

  @HasMany(() => Alimento)
  alimentos!: Alimento[];

  @HasMany(() => Refeicao)
  refeicoes!: Refeicao[];
}