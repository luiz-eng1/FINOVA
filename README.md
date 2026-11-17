# FINOVA


Link para acessar o FINOVA: https://finova-jbji.onrender.com
AVISO: o projeto está hospedado em um plano gratuito. Se ninguém acessar por um tempo, o primeiro cadastro ou login pode demorar um pouco para responder. 



FINOVA é uma aplicação web de controle financeiro pessoal. Cada usuário cria sua conta, registra entradas e saídas e acompanha o saldo em um painel. Os dados de cada pessoa são privados e protegidos por autenticação.
Foi desenvolvido por mim como projeto de estudo, cobrindo o caminho completo de uma aplicação: banco de dados, API, interface e deploy.


O QUE O PROJETO FAZ
1.Cadastro de usuário com validação de dados e senha armazenada com hash.
2.Login com autenticação por token (JWT).
3.Painel com o resumo financeiro: total de entradas, saídas e saldo.
4.Registro de transações com descrição, valor, tipo (entrada ou saída), categoria e data.
5.Listagem das transações do usuário logado, da mais recente para a mais antiga.
6.Logout


TECNOLOGIAS
Front-end: React, Vite, React Router, CSS
Back-end: 	Node.js, Express
Banco de dados: PostgreSQL
Autenticação e segurança: JWT (jsonwebtoken), bcrypt, CORS
Infraestrutura: Render (API e site estático), Neon (PostgreSQL gerenciado), Docker (banco local em desenvolvimento)

Rotas da API
Método    	Rota	            Protegida	    Descrição
POST	  /usuarios/cadastro	 Não	          Cria um usuário
POST	  /usuarios/login	     Não	          Autentica e devolve o token
GET	    /usuarios/perfil	   Sim	          Retorna o id do usuário autenticado
GET	    /transacoes	         Sim	          Lista as transações do usuário
POST	  /transacoes	         Sim	          Cria uma transação
GET	    /transacoes/resumo	 Sim	          Totais de entradas e saídas
