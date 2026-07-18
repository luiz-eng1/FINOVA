
import { criarTransacao, listarPorUsuario } from "../model/transacao.model.js";



export async function criar(req, res){
    

    try{
        const valor = req.body.valor;
        const descricao = req.body.descricao;
        const tipo = req.body.tipo;
        const data = req.body.data;
        const usuarioId = req.usuarioId;

        if(!valor || valor < 0){
            return res.status(400).json({
                erro: "Valor da transação obrigatório."
            })
        }

        if(tipo !== 'entrada' && tipo !== 'saida'){
            return res.status(400).json({
                erro: "Tipo da trasação inválido."
            })
        }


        const transacaoCriada = await criarTransacao(valor, descricao, tipo, data, usuarioId);
        return res.status(201).json(transacaoCriada);
    }catch(erro){
        console.error(erro);
        return res.status(500).json({
            erro: "Erro. tente novamente mais tarde."
        })
    }
}



export async function listar(req, res){
    try{
        const usuarioId = req.usuarioId;

        const listaUsuario = await listarPorUsuario(usuarioId);
        return res.status(200).json(listaUsuario);
    }catch(erro){
        console.error(erro);
        return res.status(500).json({
            erro: "Erro. tente novamente mais tarde."
        })
    }
}