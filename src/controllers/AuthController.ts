import { Request,Response } from "express"
import bcrypt from "bcrypt";
import {Users} from "../models/usersModel"
import {States} from "../models/statesModel"

import { validationResult,matchedData } from "express-validator"


const signin = async (req:Request,res:Response)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({message:errors.mapped()})
    }
    const data = matchedData(req)
    
    const userFind = await Users.findOne({
        where:{
            email:data.email
        }
    })


    if (!userFind){
        return res.status(404).json({message:'Usuário ou senha incorreto'})
    }
    const checkPass = await bcrypt.compare(data.password,userFind?.passHashed)
    if(checkPass){
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload,10)
        userFind.token = token
        userFind.save()
        return res.json({message:'Logado com sucesso!',
        name:userFind.name,
        email: userFind.email,
        token: userFind.token})

    }
    return res.status(404).json({message:'Usuário ou senha incorreto'})
}
const signup = async (req:Request,res:Response)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({message:errors.mapped()})
    }

    const data = matchedData(req)

    const userEmail = await Users.findOne({
        where:{
            email:data.email
        }
    })
    
    const userStates = await States.findOne({
        where:{
            name:data.state
        }
    })

    if (userEmail){
        return res.json({message:'Já existe um usuário cadastrado com esse e-mail'})
    }

    if(!userStates){
        return res.json({message:`O estado ${data.state} não existe`})
    }

    const passHash = await bcrypt.hash(data.password,10)
    const payload = (Date.now() + Math.random()).toString()
    const token = await bcrypt.hash(payload,10)

    try{
        const user = await Users.create({
        name:data.name,
        email:data.email,
        state:data.state,
        passHashed:passHash,
        token})


        return res.json({message:'tudo ok',data, token:user.token})
    }
    catch(err){
        return res.status(400).json({message:'Erro na criação do usuário'})
    }


    
    
}

export = {
    signin,
    signup
}