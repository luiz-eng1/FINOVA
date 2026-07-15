import {Router} from "express"
import {cadastrar} from "../controller/usuario.controller.js"
const router = Router()


router.post("/cadastro", cadastrar)


export default router