import { checkSchema } from "express-validator";

export default {
    editUser:checkSchema({
        token:{
            notEmpty:true,
            errorMessage: 'Informar o token é necessário'
        },
        name:{
            optional:true,
            trim: true,
            isLength:{
                options:{
                    min:2
                },
                errorMessage: 'Nome precisa ter no minino 2 caracteres'
            }
        },
        email:{
            optional:true,
            isEmail:true,
            normalizeEmail: true,
            errorMessage:'E-máil inválido'
        },
        password:{
            optional:true,
            isLength:{
                options:{
                    min:2
                }
                
            },
            errorMessage: 'Senha precisa ter no minino 2 caracteres'
        },
        state:{
            optional:true,
            isLength:{
                options:{
                    min:2,
                    max:2
                }
            },
            errorMessage: 'O estado precisa ter um codigo de estado com 2 caracteres'
        }
    })
}