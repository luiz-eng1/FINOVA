import {useState, useEffect} from "react"


function Dashboard(){

    //carregando os dados da API com os 3 estados
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState("")

    useEffect(() => {
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
        carregar()
    }, []);


   

    return(
        <>

        <h1>Dashboard</h1>
        {carregando && <p>Carregando...</p>}
        {erro && <p style={{color: "red"}}>{erro}</p>}
        {!carregando && <p>{dados.length} transações carregadas</p>}

        </>
    )
}


export default Dashboard