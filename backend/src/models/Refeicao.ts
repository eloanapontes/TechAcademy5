import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Alimento } from './Alimento';
import { RefeicaoAlimento } from './RefeicaoAlimento';
import { Usuario } from './Usuario';

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

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  usuarioId!: number;

  @BelongsTo(() => Usuario)
  usuario!: Usuario;

  @BelongsToMany(() => Alimento, () => RefeicaoAlimento)
  alimentos!: Alimento[];
}