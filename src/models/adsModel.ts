import {sequelize} from "../connection/db_connection";
import {Model,DataTypes} from "sequelize";

export interface AdsModel extends Model{
    id:number,
    creatorUserId:number,
    state:string,
    category:string,
    images: Array<object>,
    dateCreated: Date,
    title: string,
    price: Number,
    priceNegotiable:Boolean,
    description: string,
    views: Number,
    status: string

}

export const Ads = sequelize.define<AdsModel>('Ads',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    creatorUserId:{
        allowNull:false,
        type:DataTypes.INTEGER
    },
    state:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.STRING
    },
    images:{
        type:DataTypes.ARRAY(DataTypes.JSON)
    },
    dateCreated:{
        type:DataTypes.DATE
    },
    title:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.INTEGER
    },
    priceNegotiable:{
        type:DataTypes.BOOLEAN
    },
    description:{
        type:DataTypes.STRING
    },
    views:{
        type:DataTypes.INTEGER
    },
    status:{
        type:DataTypes.STRING
    }
},{
    tableName:'MLads',
    timestamps:false
}
)