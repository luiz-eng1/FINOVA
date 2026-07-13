import express from "express"
import "dotenv/config";




const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req , res) => {
    res.send("teste");
})



app.listen(port, () => {
    console.log("servidor rodando na porta "+ port)
});
