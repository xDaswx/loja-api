import { Sequelize } from "sequelize";
require('dotenv').config()

export const sequelize = new Sequelize(
    process.env.DATABASE as string,
    process.env.DBUSER as string,
    process.env.DBPASS as string,
    {
        host: process.env.DBHOST as string,
        dialect:'postgres',
        port: parseInt(process.env.DBPORT as string)
    }
)

sequelize.authenticate().then(()=>{
    console.log("Conexão ao banco de dados com sequelize foi bem sucedida")
}).catch((err)=>{
    console.log("Erro em conexão ao banco de dados: "+ err)
})