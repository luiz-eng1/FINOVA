import {useState} from "react"
import {useNavigate} from "react-router-dom"
import "./Login.css"
function Login(){


    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");




  async function fazerLogin(){


    try{
      const resposta = await fetch("http://localhost:3000/usuarios/login", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({email, senha})
    });

    const dados = await resposta.json();

    if(resposta.ok){

      localStorage.setItem("token", dados.token);
      console.log("Logado!", dados.token)
      navigate("/dashboard")
    }else{

      setErro(dados.erro)
      
    }


    
    }catch(err){
      setErro("Erro ao conectar");
    }
    
  }




    return (
      <div className="pagina">
        
        <div className="card">


        <div className="cabecalho">
        <label>FINOVA</label>
        <p>Entre em sua conta</p>
        </div>


        <div className="caixa">

        <label >Email</label>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

        </div>
        
        <div className="caixa">

        <label>Senha</label>
        <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
        
        </div>

        <div className="caixaBtn">
        <button onClick={fazerLogin}>Entrar</button>
        </div>

         <div className="caixaCadastro">
          <button onClick ={() => navigate("/cadastro")}> Não tem uma conta? Cadastre-se</button>
        </div>

        {erro && <p style={{color: "red"}}>{erro}</p>}

        </div>
      </div>
    )
}

export default Login