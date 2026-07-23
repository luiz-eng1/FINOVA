import pool from "./pool.js"


export async function criarTransacao(valor, descricao, tipo, data, usuarioId){
    
    const criaTr = await pool.query("INSERT INTO transacoes(valor, descricao, tipo, data, usuario_id ) VALUES ($1, $2, $3, $4, $5 ) RETURNING * ", [valor, descricao, tipo, data, usuarioId]);
    return criaTr.rows[0];

}


export async function listarPorUsuario(usuarioId){
    

    const retornaTr = await pool.query("SELECT * FROM transacoes WHERE usuario_id = $1 ORDER BY data DESC", [usuarioId]);
    return retornaTr.rows;
}

export async function resumoPorUsuario(usuarioId){
    const resumo = await pool.query("SELECT tipo, SUM(valor) as total FROM transacoes WHERE usuario_id = $1 GROUP BY tipo", [usuarioId]);
    return resumo.rows;
}