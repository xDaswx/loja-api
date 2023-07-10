import { Request, Response, NextFunction } from "express";
import {Users} from '../models/usersModel'


export const CheckToken = async (req:Request,res:Response,next:NextFunction)=>{
    // if (req.query.token) return res.status(401).json({message:'O token deve ser enviado apenas em formado JSON'})
    let token;

    if (!req.body.token && !req.query.token) return res.status(401).json({message:'Usuário não forneceu o token de acesso'})
    
    

    if (req.body.token && req.body._token.length > 50){
        try{
            let token = await Users.findOne({
                where:{
                    token:req.body.token
                }
            })

            return res.status(200).json({message:token})

        }
        catch(err){
            return res.status(400).json({message:'Token invalido'})
        }



    }

}