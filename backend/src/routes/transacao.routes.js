import {Router} from "express"
import {criar, listar} from "../controller/transacao.controller.js"
import {autotoken} from "../middleware/auth.middleware.js"
import {resumo} from "../controller/transacao.controller.js"
const router = Router();


router.post("/",autotoken, criar)
router.get("/", autotoken, listar)
router.get("/resumo",autotoken,  resumo)
router.delete("/:id", autotoken, excluir);

export default router