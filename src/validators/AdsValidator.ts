import { checkSchema } from "express-validator";

export default {
    editAd:checkSchema({
        id:{
            optional:false,
            errorMessage:'É necessário informar o id'
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
        },
        category:{
            optional:true,
            isLength:{
                options:{
                    min:6
                }
            },
            isString:{
                errorMessage: 'Categoria precisa ser uma string'
            },
            errorMessage: 'Categoria tamanho invalido'
        },
        images:{
            optional:true,
            isArray:{
                options:{
                    max:3
                },
                errorMessage: 'A imagem deve ser um array de string com no máximo 3 objetos'
            }
        },
        title:{
            optional:true,
            isLength:{
                options:{
                    min:5
                },
            },
            errorMessage: 'O titulo do anuncio tem o tamanho minimo de 5 caracteres'
        },
        price:{
            optional:true,
            isLength:{
                options:{
                    max:6
                },
            },
            isString:{
                errorMessage: 'Price precisa ser uma string'
            },
            errorMessage: 'O preço no máximo de 6 digitos'
        },
        priceNegotiable:{
            optional:true,
            isBoolean:{
                errorMessage: 'Precisa ser um booleano'
            }
        },
        description:{
            optional:true,
            isLength:{
                options:{
                    min:6
                },
            },
            isString:{
                errorMessage: 'Descrição precisa ser uma string'
            },
            errorMessage: 'A Descrição no minimo 6 digitos'
        },

    })
}