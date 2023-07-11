import express,{Request,Response} from "express";
import fileupload from 'express-fileupload';
import router from "./routes/routes";
import cors from "cors";
import bodyParser  from "body-parser";
require('dotenv').config()

const app = express()
app.use(fileupload())


app.use(express.static('public'))
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(cors())

app.use(router)

const port = process.env.PORT
app.listen(port, ()=> console.log('Servidor iniciado na porta: '+port))

