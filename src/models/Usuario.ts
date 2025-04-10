import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';


interface UsuarioAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
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
}
