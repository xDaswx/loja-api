import { Request,Response } from "express"
import {Categories} from "../models/categoriesModel"
import { Ads,AdsModel } from "../models/adsModel"
import { States } from "../models/statesModel"
import {v4 as uuidv4} from "uuid"
import { Users } from "../models/usersModel"
import jimp from "jimp"
import { validationResult,matchedData } from "express-validator"


interface ImageObject {
    url: string;
  }


const fixImage = async (buffer:Buffer,user_id:number) => {
    let imgname = `${uuidv4()}.jpg`
    let tmpImg = await jimp.read(buffer)
    tmpImg.cover(500,500).quality(80).write(`./public/media/${user_id}/${imgname}`);
    return imgname;
}


const getCategories = async (req:Request,res:Response)=>{
    try{
        const allCategories = await Categories.findAll()
        res.status(200).json(allCategories)
    }catch(err){
        console.log(err)
        res.status(500).json('Server error')
    }
}

const addAction = async (req:Request,res:Response)=>{ 

    let {title,price,priceneg,description,category,imagens,token} = req.body


    if (!title || !category || !price || !token){
        return res.status(400).json({message:"As fields: token,title,category e price são necessárias"})
    }

    if (typeof price != 'string'){
        return res.status(400).json({message:"O price precisa ser enviado com o tipo string"})
    }


    if (!(imagens && Array.isArray(imagens) && imagens.filter(img => typeof img ==='object' && 'url' in img))){
        return res.status(400).json({message:'Campo imagens está invalido, é necessário ser um array com uma lista de objetos contendo a key url'})
    }

    const formattedPrice = price.replace(',', '').replace(',','.').replace(/[a-zA-Z]+/,'');

    if (parseInt(formattedPrice) >= 100000){
        return res.status(400).json({message:'O preço maximo por item é de 100.000'})
    }

    const user = await Users.findOne({
        where:{
            token
        }
    })
    if (!user){
        return res.status(500).json({message:'Server error'})
    }
    
    
    const retorno = await Ads.create({
        creatorUserId:user.id,
        state:user.state,
        category,
        images: imagens,
        dateCreated: new Date(),
        title,
        price: formattedPrice,
        priceNegotiable:priceneg ?? false,
        description,
        views: 0,
        status: true
    })
    
    return res.json(retorno)


    
}

const addPicture = async (req:Request,res:Response)=>{
    // if (req.files) {
    //     const filesArray = Array.isArray(req.files) ? req.files : Object.values(req.files);
      
    //     for (const file of filesArray) {
    //       if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
    //             const url = await fixImage(file.data);
    //             console.log(url);
    //       }
    //       else{
    //         return res.status(400).json({message:'Apenas arquivos com formato png ou jpg'})
    //       }
 
    //     }
    // }
    const user = await Users.findOne({
        where:{
            token:req.query.token 
        }
    })
    if (!user){
        return res.status(500).json({message:'Server error'})
    }

    const files = []
    if (req.files && req.files.imagens) {
        const imagesArray = Object.values(req.files.imagens);
        for (const image of imagesArray) {
            if (image.mimetype === 'image/png' || image.mimetype === 'image/jpeg'){
                const url = await fixImage(image.data,user.id);
                files.push(`${req.protocol}://${req.headers.host}/media/${user.id}/${url}`)
            }
             else{
                return res.status(400).json({message:'Apenas arquivos com formato png ou jpg',files})
          }
        }
    }
    else{
        return res.json({message:"Os arquivos de imagens deve possuir o form-data name chamado imagens"})
    }
    res.json({message:"conteudo recebido!",files})
}

const getList = async (req:Request,res:Response)=>{
    try{
        const ads = await Ads.findAll()
        if (ads){
            return res.json({
                ads

            })
        }

    }
    catch(err){
        return res.status(500).json({message:"Server error"})
    }
    
    
}

const getItem = async (req:Request,res:Response)=>{
    const {id} = req.params

    if(id){
        try{
            console.log(typeof id)
            if(Number.isInteger(id)) {
                return res.json({message:"numero",id})
            }
            const ads = await Ads.findByPk(id)
            
            if (ads){
                return res.json({
                    ads
    
                })
            }
            return res.json({message:'Nenhum anuncio encontrado'})    
        }
        catch(err){
            return res.status(500).json({message:"Server error"})
        }
    }

    
    
}
const editAction = async (req:Request,res:Response)=>{
    const {id} = req.params
    if (!id) res.status(404).json({message: "Não contem o id da postagem nos parametros"})
    
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({message:errors.mapped()})
    }

    const data = matchedData(req)
    const keys = Object.keys(data)
    console.log(keys)
    if (keys.length == 1){
        return res.status(400).json({message:"Você precisa especificar o valor que deseja alterar"})
    }

    if (data.state){
        const userStates = await States.findOne({where:{name:data.state}})
        if(!userStates){
            return res.json({message:`O estado ${data.state} não existe`})
        }
    
    }
    
    if(data.images){
        const isArray = Array.isArray(data.images);
        const isValid = isArray && data.images.every((img: ImageObject) => typeof img === 'object' && img.hasOwnProperty('url'));
      
        if (!isValid) {
            return res.status(400).json({ message: 'Campo imagens está inválido, é necessário ser um array com uma lista de objetos contendo a key url' });
          }
    }
    try {
        await Ads.update(data,{
            where:{
                id
            }
        })
        return res.status(400).json({message:"Dados alterados com sucesso!"})

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Erro enquanto atualizava os dados do anuncio",error})
    }
}
export = {
    getCategories,
    addAction,
    addPicture,
    getList,
    getItem,
    editAction
}