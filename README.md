Esse README está formatado para parecer que foi feito por um desenvolvedor organizado. Ele explica o projeto, as tecnologias e como rodar.Markdown# 📚 Sistema de Gerenciamento de Mídia - Projeto Web

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

Este projeto consiste em uma aplicação Fullstack (Backend API + Frontend Simples) desenvolvida para a disciplina de Desenvolvimento Web. O objetivo é gerenciar um catálogo de Autores e suas obras (Livros, CDs e DVDs), implementando um CRUD completo, relacionamentos no banco de dados NoSQL e autenticação de usuários.

## 🚀 Funcionalidades

-   **Autenticação Segura:** Login e Registro de usuários com hash de senha (Bcrypt) e Tokens JWT.
-   **Proteção de Rotas:** Apenas usuários logados podem Criar, Editar ou Excluir itens.
-   **Relacionamento de Dados:** Todo Livro, CD ou DVD é obrigatoriamente vinculado a um Autor existente no banco.
-   **API RESTful:** Endpoints padronizados para consumo via Frontend ou Postman/Insomnia.
-   **Frontend:** Interface limpa utilizando HTML, CSS e Vanilla Javascript para consumo da API.

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução.
* **Express:** Framework para criação do servidor e rotas.
* **MongoDB Atlas:** Banco de dados na nuvem (NoSQL).
* **Mongoose:** ODM para modelagem dos dados.
* **JWT & Bcrypt:** Segurança e Autenticação.
* **HTML5/CSS3/JS:** Interface do usuário.

## 📂 Estrutura do Projeto

O projeto segue o padrão MVC (Model-View-Controller) para organização de código:

├── public/           # Arquivos do Frontend (HTML, CSS, JS)├── src/│   ├── config/       # Configuração de conexão com o Banco│   ├── controllers/  # Lógica das requisições (Regras de negócio)│   ├── middleware/   # Verificação de token de acesso│   ├── models/       # Schemas do Banco de Dados│   └── routes/       # Definição das rotas da API├── .env.example      # Exemplo das variáveis de ambiente necessárias└── server.js         # Ponto de entrada da aplicação
## 🔧 Como rodar o projeto

### Pré-requisitos
* Node.js instalado na máquina.
* Uma string de conexão do MongoDB (Atlas ou Local).

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/SEU-USUARIO/NOME-DO-REPO.git](https://github.com/SEU-USUARIO/NOME-DO-REPO.git)
   cd NOME-DO-REPO
Instale as dependênciasBashnpm install
Configure as Variáveis de AmbienteRenomeie o arquivo .env.example para .env e preencha com suas credenciais:Snippet de códigoPORT=3000
MONGO_URI=sua_string_conexao_mongodb
JWT_SECRET=palavra_secreta_para_token
Execute o ServidorBashnode server.js
AcesseAbra o navegador em: http://localhost:3000📝 Rotas da APIMétodoRotaDescriçãoAuthPOST/api/auth/registrarCria novo usuárioNãoPOST/api/auth/loginFaz login e recebe TokenNãoGET/api/autoresLista autoresNãoPOST/api/autoresCria autorSimGET/api/livrosLista livrosNãoPOST/api/livrosCria livro (c/ ID autor)SimDELETE/api/livros/:idRemove livroSim(O padrão se repete para CDs e DVDs)Desenvolvido para fins acadêmicos.