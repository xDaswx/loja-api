import {sequelize} from "../connection/db_connection";
import {Model,DataTypes} from "sequelize";

export interface UsersModel extends Model{
    id:number,
    name:string,
    email:string,
    state:string,
    passHashed:string,
    token:string;
}

export const Users = sequelize.define<UsersModel>('Users',{
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
    email:{
        allowNull:false,
        type:DataTypes.STRING
    },
    state:{
        type:DataTypes.STRING
    },
    passHashed:{
        allowNull:false,
        type:DataTypes.STRING
    },
    token:{
        allowNull:false,
        type:DataTypes.STRING
    }
},{
    tableName:'MLusers',
    timestamps:false
}
)