import { sequelize } from "../connection/db_connection";
import { Model, DataTypes } from "sequelize";

export interface StateModel extends Model {
  id: number;
  name: string;
}

export const States = sequelize.define<StateModel>("States", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  tableName: "MLstates",
  timestamps: false,
});

States.sync();
