import { Request,Response } from "express"
import { Users } from "../models/usersModel"
import { States } from "../models/statesModel"
import { Ads,AdsModel } from "../models/adsModel"
import bcrypt from "bcrypt"
import { validationResult,matchedData } from "express-validator"


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
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({message:errors.mapped()})
    }

    const data = matchedData(req)
    const keys = Object.keys(data)
    if (keys.includes("token") && keys.length == 1){
        return res.status(400).json({message:"Você precisa especificar o valor que deseja alterar"})
    }

    const email = await Users.findOne({
        where:{
            email:data.email
        }
    })
    if (data.state){
        const userStates = await States.findOne({where:{name:data.state}})
        if(!userStates){
            return res.json({message:`O estado ${data.state} não existe`})
        }
    
    }


    if (email){
        return res.json({message:`Esse e-mail já está sendo utilizado`})
    }
    if (data.password){
        data.passHashed = await bcrypt.hash(data.password,10)
    }
    
    const user =  await Users.update(
        data,{
            where:{
                token:data.token
            }
    })
    delete data.passHashed

   return res.status(400).json({message:"Dados alterados com sucesso!",User:data})



    
    
}

export = {
    getStates,
    getInfo,
    editInfo
}