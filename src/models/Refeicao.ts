import { Model, DataTypes, Optional, Association, BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import { Alimento } from './Alimento';

interface RefeicaoAttributes {
  id: number;
  nome: string;
}

interface RefeicaoCreationAttributes extends Optional<RefeicaoAttributes, 'id'> {}

export class Refeicao extends Model<RefeicaoAttributes, RefeicaoCreationAttributes> implements RefeicaoAttributes {
  public id!: number;
  public nome!: string;

  public setAlimentos!: BelongsToManySetAssociationsMixin<Alimento, number>;
  public addAlimentos!: BelongsToManyAddAssociationsMixin<Alimento, number>;

  public static associations: {
    alimentos: Association<Refeicao, Alimento>;
  };
}

Refeicao.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'refeicoes',
    sequelize,
  }
);
