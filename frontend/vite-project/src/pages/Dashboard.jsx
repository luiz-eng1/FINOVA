import {useState, useEffect} from "react"


function Dashboard(){

    //carregando os dados da API com os 3 estados
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")

    // estados para a exibição do formdashboard
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("saida");
    const [data, setData] = useState("");


    //estado para o resumo financeiro
    const [resumo, setResumo] = useState({entradas: 0, saidas: 0, saldo: 0});

        async function carregar (){

            try{
                const token = localStorage.getItem("token");

                const resposta = await fetch("http://localhost:3000/transacoes", {
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
            const resposta = await fetch("http://localhost:3000/transacoes/resumo", {
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
            const resposta = await fetch("http://localhost:3000/transacoes", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({descricao, valor, tipo, data})
            });

            if(resposta.ok){
                carregar();
                carregarResumo();
                setDescricao("");
                setValor("");
                setData("");
                setTipo("saida");
            }else{
                const resultado = await resposta.json();
                setErro(resultado.erro);
                
            }

        }catch(erro){
            console.log("Erro de conexão");
        }
    }


   

    return(
        <>

        <h1>Dashboard</h1>
        {carregando && <p>Carregando...</p>}
        {erro && <p style={{color: "red"}}>{erro}</p>}
        {!carregando && dados.length === 0 && <p>Nenhuma transação ainda.</p>}





        <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
        <input value= {valor} onChange={(e) => setValor(e.target.value)} placeholder="Valor"/>
        <select value= {tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="saida">Saida</option>
            <option value="entrada">Entrada</option>
        </select>
        <input value= {data} onChange={(e) => setData(e.target.value)} type="date"></input>
        <button onClick={adicionar}>Adicionar</button>







        {dados.map((transacao) => ( 
            <div key={transacao.id}>    
                <p> {transacao.tipo} </p>
                <p> {new Date(transacao.data).toLocaleDateString('pt-BR')} </p>
                <p>{transacao.descricao} - R$ {transacao.valor} </p>

            </div>
        ))}


        <div>
            <p>Entradas: R$ {resumo.entradas} </p>
            <p>Saídas: R$ {resumo.saidas} </p>
            <p>Saldo: R$ {resumo.saldo} </p>
        </div>




        </>
    )
}


export default Dashboard