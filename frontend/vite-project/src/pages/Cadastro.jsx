
import {useState} from "react"
import {useNavigate} from "react-router-dom"


function Cadastro(){

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");



    async function fazerCadastro(){

        try{
        const resposta = await fetch("http://localhost:3000/usuarios/cadastro", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({nome, email, senha})
        });

        const dados = await resposta.json();

        if(resposta.ok){
            navigate("/login")
        }else{
            setErro(dados.erro)
        }


    }catch(err){
        setErro("Erro ao criar usuário.");
    }
    

    
    }


    return(
        <>
        <div>
            <button onClick={() => navigate("/login")}
            >Login</button>
        </div>
        <div>
        <p>Nome:</p>
        <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}></input>

        <p>Email:</p>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

        <p>Senha: </p>
        <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}></input>

        <button onClick={fazerCadastro}>Cadastrar</button>
        </div>

        {erro && <p style={{color: "red"}}>{erro}</p>}
        </>
    )
}
export default Cadastro
