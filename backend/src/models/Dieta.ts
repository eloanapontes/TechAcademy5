import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
  } from 'sequelize-typescript';
  import { Usuario } from './Usuario';
  import { Refeicao } from './Refeicao';
  import { DietaRefeicao } from './DietaRefeicao';
  
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
  
    @BelongsTo(() => Usuario)
    usuario!: Usuario;
  
    @BelongsToMany(() => Refeicao, () => DietaRefeicao)
    refeicoes!: Refeicao[]; // <-- ESSA LINHA aqui resolve o teu erro!!
  }
  