import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Refeicao } from './Refeicao';
  import { Alimento } from './Alimento';
  
  @Table({
    tableName: 'refeicoes_alimentos',
    timestamps: false,
  })
  export class RefeicaoAlimento extends Model<RefeicaoAlimento> {
    @ForeignKey(() => Refeicao)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    refeicaoId!: number;
  
    @BelongsTo(() => Refeicao)
    refeicao!: Refeicao;
  
    @ForeignKey(() => Alimento)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    alimentoId!: number;
  
    @BelongsTo(() => Alimento)
    alimento!: Alimento;
  }
  