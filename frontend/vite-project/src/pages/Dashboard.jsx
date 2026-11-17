import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { API_URL } from "../api.js"
import "./Dashboard.css"

function Dashboard(){

    const navigate = useNavigate();
    //carregando os dados da API com os 3 estados
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")

    // estados para a exibição do formdashboard
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [nicho ,setNicho] =useState("");
    const [tipo, setTipo] = useState("saida");
    const [data, setData] = useState("");


    //estado para o resumo financeiro
    const [resumo, setResumo] = useState({entradas: 0, saidas: 0, saldo: 0});

        async function carregar (){

            try{
                const token = localStorage.getItem("token");

                const resposta = await fetch(`${API_URL}/transacoes`, {
                headers: { Authorization: "Bearer " + token }
                });

                const resultado = await resposta.json();
                if(resposta.ok){
                    setDados(resultado);
                }else{
                    setErro("Não foi possivel carregar as transações");
                }
                setCarregando(false);
            }catch(erro){
                console.error(erro);
                setCarregando(false);
                setErro("Não foi possivel carregar as transações");
            }

        }
        

    


    async function carregarResumo(){
        try{
            const token = localStorage.getItem("token");
            const resposta = await fetch(`${API_URL}/transacoes/resumo`, {
                headers: { Authorization: "Bearer " + token}
            });
            const resultado = await resposta.json();
            if(resposta.ok){
                setResumo(resultado);
            }else{
                setErro("Não foi possivel carregar as transações");
            }
            setCarregando(false);
        }catch(erro){
            console.error(erro)
            setCarregando(false)
            setErro("Não foi possivel carregar as transações")
        }
    }

    useEffect(() => {
        carregar();
        carregarResumo();
    }, []);


    async function adicionar(){
        try{
            const token = localStorage.getItem("token");
            const resposta = await fetch(`${API_URL}/transacoes`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({descricao, valor, tipo, data, nicho})
            });

            if(resposta.ok){
                carregar();
                carregarResumo();
                setDescricao("");
                setValor("");
                setData("");
                setNicho("");
                setTipo("saida");
            }else{
                const resultado = await resposta.json();
                setErro(resultado.erro);
                
            }

        }catch(erro){
            console.log("Erro de conexão");
        }
    }

    function sair(){
        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        navigate("/login", {replace: true}) // replace serve para trocar a pag no histórico, em vez de empilhar outra
    }

    function formatarMoeda(valor){
        return Number(valor).toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
    }



    async function excluir(id){
    if(!window.confirm("Excluir esta transação?")) return;

    try{
        setErro("");
        const token = localStorage.getItem("token");
        const resposta = await fetch(`${API_URL}/transacoes/${id}`, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token }
        });

        if(resposta.ok){
            carregar();
            carregarResumo();
        }else{
            const resultado = await resposta.json();
            setErro(resultado.erro);
        }
    }catch(err){
        console.error(err);
        setErro("Erro ao excluir a transação.");
    }
}

   

    return(
        <div className="dashboard">

    <header className="topo">
      <h1>FINOVA</h1>
      <div className="usuario">
      <span>olá, {localStorage.getItem("nome")}</span>
      <button onClick={sair}>Sair</button>
      </div>
    </header>

    <section className="visao">
      {carregando && <p>Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}

      <div className="resumo">
        <div className="cartao">
          <span>Entradas</span>
          <strong className="positivo">{formatarMoeda(resumo.entradas)}</strong>
        </div>

        <div className="cartao">
          <span>Saídas</span>
          <strong className="negativo">{formatarMoeda(resumo.saidas)}</strong>
        </div>

        <div className="cartao">
          <span>Saldo</span>
          <strong className={Number(resumo.saldo) < 0 ? "negativo" : "positivo"}>
            {formatarMoeda(resumo.saldo)}
          </strong>
        </div>
      </div>
    </section>

    <div className="colunas">

      <div className="formulario">
        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
        <input value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor" />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="saida">Saída</option>
          <option value="entrada">Entrada</option>
        </select>
        <input value={nicho} onChange={(e) => setNicho(e.target.value)} placeholder="Ex: Mercado" />
        <input value={data} onChange={(e) => setData(e.target.value)} type="date" />
        <button onClick={adicionar}>Adicionar</button>
      </div>



      <div className="lista">
        {!carregando && dados.length === 0 && (
          <p className="vazio">Nenhuma transação ainda. Adicione a primeira.</p>
        )}

        {dados.map((transacao) => (
          <div key={transacao.id}>
            <p className={transacao.tipo}>
              {transacao.tipo === "entrada" ? "Entrada" : "Saída"}
            </p>
            <p>{new Date(transacao.data).toLocaleDateString("pt-BR")}</p>
            <p>{transacao.descricao} - {formatarMoeda(transacao.valor)}</p>
            <button className="excluir" onClick={() => excluir(transacao.id)}>✕</button>
          </div>
        ))}
      </div>

    </div>
  </div>
    )
}


export default Dashboard