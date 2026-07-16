import { buscarPorEmail, criarUsuario } from "../model/usuario.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



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




export async function login(req, res){
 

    


try{

    //recebe email e senha
    const email = req.body.email;
    const senha = req.body.senha;

    if(!email || !senha){
        return res.status(400).json({
            erro: "Email e senha são obrigatórios"
        })
    }

    const usuario = await buscarPorEmail(email);

    if(!usuario){
        return res.status(401).json({
            erro: "Email ou senha inválidos"
        })
    }

   
    const senhaConfere = await bcrypt.compare(senha, usuario.senha);

    //verifica se a senha está correta
    if(!senhaConfere){
        return res.status(401).json({
            erro: "Email o senha inválidos"
        })
    }

    // cria o jwtoken
    const token = jwt.sign(
        {id: usuario.id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )


    return res.status(200).json({
        token: token,
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    })


}catch(erro){

    console.error(erro);

    return res.status(500).json({
        erro: "Erro. Tente novamente mais tarde."
    })

    
}

}