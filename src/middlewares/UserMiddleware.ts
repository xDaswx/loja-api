import { Request, Response, NextFunction } from "express";
import {Users} from '../models/usersModel'


export const CheckToken = async (req:Request,res:Response,next:NextFunction)=>{
    // if (req.query.token) return res.status(401).json({message:'O token deve ser enviado apenas em formado JSON'})
    let token:string;

    if (req.query.token) {
      token = req.query.token as string;
    } else if (req.body.token) {
      token = req.body.token as string;
    } else {
      return res.status(401).json({ message: 'Usuário não forneceu o token de acesso' });
    }

    if (token.length < 10) return res.status(401).json({ message: 'Não parece ser um token válido' }); 

    try{
        let user = await Users.findOne({
            where:{
                token:token
            }
        })
        if (user){
            return next()
        }
        return res.status(400).json({message:'Usuário com o token específico não foi encontrado'})

    }
    catch(err){
        return res.status(400).json({message:'Erro interno'})
    }
    

}