import {Router} from "express"
import {cadastrar} from "../controller/usuario.controller.js"
import { autotoken } from "../middleware/auth.middleware.js";
import {login} from "../controller/usuario.controller.js"
import {resumo} from "../controller/transacao.controller.js"
const router = Router()


router.post("/cadastro", cadastrar)
router.post("/login", login); // 'se eu dia chegar uma função no caminho /login , chame  a função login
router.get("/perfil", autotoken, (req, res) => { res.json({ usuarioId: req.usuarioId }) })



export default router