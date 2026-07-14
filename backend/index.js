import express from "express"
import "dotenv/config";
import pool from "./src/model/pool.js"



const app = express();

const port = 3000;

app.use(express.json()); // middleware sempre antes das routes

app.get("/", (req , res) => {
    res.send("teste");
})


async function testarConexao(){
    try{
        const resultado = await pool.query("SELECT NOW()"); //await so pode ser usado dentro de uma função asynmc
        console.log(resultado.rows); // .rows retorna apenas os dados
    }catch(err){
        console.error("Erro ao conectar: ", err);
    }
}

testarConexao();


app.listen(port, () => {
    console.log("servidor rodando na porta "+ port)
});



