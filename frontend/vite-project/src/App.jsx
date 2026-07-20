import { useState } from 'react'
import './App.css'



function App(){

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  return(
    <>

      <div>
        <p>Email</p>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

        <p>Senha</p>
        <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}></input>
        <p>Você digitou: {email}</p>

        <button>Entrar</button>
      </div>



    </>
  )
}

export default App
