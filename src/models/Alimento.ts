import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'alimentos',
  timestamps: false,
})
export class Alimento extends Model {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  calorias!: number;
}
