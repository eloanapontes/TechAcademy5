import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
  } from 'sequelize-typescript';
  import { Dieta } from './Dieta';
  import { Refeicao } from './Refeicao';
  
  @Table({ tableName: 'dietas_refeicoes' })
  export class DietaRefeicao extends Model {
    @ForeignKey(() => Dieta)
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    })
    dietaId!: number;
  
    @ForeignKey(() => Refeicao)
    @Column({
      type: DataType.INTEGER.UNSIGNED,
      allowNull: false,
    })
    refeicaoId!: number;
  }
  