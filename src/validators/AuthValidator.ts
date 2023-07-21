import { checkSchema } from "express-validator";

export default {
    signup:checkSchema({
        name:{
            trim: true,
            isLength:{
                options:{
                    min:2
                },
                errorMessage: 'Nome precisa ter no minino 2 caracteres'
            }
        },
        email:{
            isEmail:true,
            normalizeEmail: true,
            errorMessage:'E-máil inválido'
        },
        password:{
            isLength:{
                options:{
                    min:2
                }
                
            },
            errorMessage: 'Senha precisa ter no minino 2 caracteres'
        },
        state:{
            isLength:{
                options:{
                    min:2,
                    max:2
                }
            },
            errorMessage: 'O estado precisa ter um codigo de estado com 2 caracteres'
        }
    }),
    signin:checkSchema({
        email:{
            isEmail:true,
            normalizeEmail: true,
            errorMessage:'E-máil inválido'
        },
        password:{
            isLength:{
                options:{
                    min:2
                }
                
            },
            errorMessage: 'Senha precisa ter no minino 2 caracteres'
        }
    })
}