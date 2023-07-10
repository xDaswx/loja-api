import {sequelize} from "../connection/db_connection";
import {Model,DataTypes} from "sequelize";

export interface CategoriesModel extends Model{
    id:number,
    name:string,
    slug:string,
}

export const Categories = sequelize.define<CategoriesModel>('Categories',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    name:{
        allowNull:false,
        type:DataTypes.STRING
    },
    slug:{
        type:DataTypes.STRING
    }
},{
    tableName:'MLcategories',
    timestamps:false
}
)