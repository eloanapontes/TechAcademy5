import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Refeicao } from './Refeicao';
import { RefeicaoAlimento } from './RefeicaoAlimento';
import { Usuario } from './Usuario';

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

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @BelongsToMany(() => Refeicao, () => RefeicaoAlimento)
  refeicoes!: Refeicao[];
}
