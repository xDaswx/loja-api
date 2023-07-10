import { Request,Response } from "express"
import { Users } from "../models/usersModel"
import { States } from "../models/statesModel"
import { Ads,AdsModel } from "../models/adsModel"

import { sequelize } from "../connection/db_connection"

const getStates = async (req:Request,res:Response)=>{
    const states = await States.findAll()
    res.json({states})

}
const getInfo = async (req:Request,res:Response)=>{
    let token = req.query.token
    const findUser = await Users.findOne({
        where:{
            token
        }
    })
    let GetAds:Array<AdsModel> = []
    

    if (findUser){

        GetAds = await Ads.findAll({
        where:{
            creatorUserId:findUser.id
        }})
    }

    res.status(200).json({
        User:{
            name:findUser?.name ?? null,
            email: findUser?.email ?? null,
            state: findUser?.state ?? null
        },
        Anuncios:GetAds
    })

    
}

const editInfo = async (req:Request,res:Response)=>{
    
}

export = {
    getStates,
    getInfo,
    editInfo
}