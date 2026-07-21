import {useState} from "react"
import {useNavigate} from "react-router-dom"
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


    
    }catch(erro){
      setErro("Erro ao conectar");
    }
    
  }




    return (
        <>

        <div>
        <p>Email</p>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

        <p>Senha</p>
        <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
        

        <button onClick={fazerLogin}>Entrar</button>
         </div>

        {erro && <p style={{color: "red"}}>{erro}</p>}


        </>
    )
}

export default Login