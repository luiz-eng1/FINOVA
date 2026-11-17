
import { criarTransacao, listarPorUsuario, resumoPorUsuario, excluirTransacao } from "../model/transacao.model.js";



export async function criar(req, res){
    

    try{
        const valor = req.body.valor;
        const descricao = req.body.descricao;
        const tipo = req.body.tipo;
        const data = req.body.data;
        const nicho = req.body.nicho;
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


        const transacaoCriada = await criarTransacao(valor, descricao, tipo, data, usuarioId, nicho);
        return res.status(201).json(transacaoCriada);
    }catch(erro){
        console.error(erro);
        return res.status(500).json({
            erro: "Erro. tente novamente mais tarde."
        })
    }
}

export async function excluir(req, res){
    try{
        const id = Number(req.params.id);

        if(!Number.isInteger(id)){
            return res.status(400).json({ erro: "Id inválido." });
        }

        const removida = await excluirTransacao(id, req.usuarioId);

        if(!removida){
            return res.status(404).json({ erro: "Transação não encontrada." });
        }

        return res.status(200).json({ mensagem: "Transação excluída." });
    }catch(erro){
        console.error(erro);
        return res.status(500).json({ erro: "Não foi possível excluir a transação." });
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




export async function resumo(req, res){
    try{

        const usuarioId = req.usuarioId;

        const resumoTransacoes = await resumoPorUsuario(usuarioId);

        
        const linhaEntrada = resumoTransacoes.find(l => l.tipo === 'entrada');
        const linhaSaida = resumoTransacoes.find(l => l.tipo === 'saida');
        
        const entradas = linhaEntrada ? Number(linhaEntrada.total) : 0;
        const saidas = linhaSaida ? Number(linhaSaida.total) : 0;

        const saldo = entradas - saidas;
        return res.status(200).json({entradas, saidas, saldo})

        
        
    }catch(erro){
        console.error(erro)
        return res.status(500).json({
            erro: "Erro. tente novamente mais tarde."
        })
    }
}