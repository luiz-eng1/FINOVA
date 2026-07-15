import { buscarPorEmail, criarUsuario } from "../model/usuario.model.js";
import bcrypt from "bcrypt"




export async function cadastrar(req, res){
    

try{
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    // verifica se todos os campos foram enviados
    if(!nome || !email || !senha ){
    
        return res.status(400).json({
            erro: "Nome, email e senha são obrigatórios."
        })
    }

    // verifica o tamanho da senha
    if(senha.length < 6){
        return res.status(400).json({
            erro: "A senha deve ter pelo menos 6 caracteres."
        })
    }

    const buscaEmail = await buscarPorEmail(email);
    if(buscaEmail){
        return res.status(409).json({
            erro: "O email já possui uma conta existente."
        })
    }

    const senhaHash = await bcrypt.hash(senha, 10); // hash da senha

    const usuario = await criarUsuario(nome, email, senhaHash);

    return res.status(201).json(usuario);
}catch(erro){


    console.log(erro);
    return res.status(500).json({
        erro: "Não foi possivel criar um usuario."
    })
}



}