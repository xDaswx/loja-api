import {Router,Request,Response} from "express";
import {CheckToken} from '../middlewares/UserMiddleware'
import AuthValidator from "../validators/AuthValidator";
import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'
import AdsController from '../controllers/AdsController'




const router = Router()


router.get('/ping', (req:Request, res:Response)=>{
    res.json({message:true})
})

router.get('/states', UserController.getStates)


router.post('/user/signin', AuthController.signin)
router.post('/user/signup', AuthValidator.signup , AuthController.signup)

router.get('/user/me', CheckToken, UserController.getInfo)
router.put('/user/me', CheckToken, UserController.editInfo)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', CheckToken, AdsController.addAction)
router.get('/ad/list', AdsController.getList)
router.get('/ad/item', AdsController.getItem)
router.post('/ad/:id', CheckToken, AdsController.editAction)



export default router;
