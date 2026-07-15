import pool from "./pool.js"


export async function buscarPorEmail(email){
    const resultado = await pool.query("SELECT * FROM usuarios WHERE email = $1 ", [email]);
    return resultado.rows[0];
}



export async function criarUsuario(nome, email, senhaHash){
    const resultadoUsuario = await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email", [nome, email, senhaHash]);
    return resultadoUsuario.rows[0];
}