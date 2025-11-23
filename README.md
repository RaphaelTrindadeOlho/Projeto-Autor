# 📚 Sistema de Gerenciamento de Mídia - Projeto Web

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

Este projeto consiste em uma aplicação Fullstack (Backend API + Frontend Simples) desenvolvida para a disciplina de Desenvolvimento Web. O objetivo é gerenciar um catálogo de Autores e suas obras (Livros, CDs e DVDs), implementando um CRUD completo, relacionamentos no banco de dados NoSQL e autenticação de usuários.

## 🚀 Funcionalidades

- **Autenticação Segura:** Login e Registro de usuários com hash de senha (Bcrypt) e Tokens JWT.
- **Proteção de Rotas:** Apenas usuários logados podem Criar, Editar ou Excluir itens.
- **Relacionamento de Dados:** Todo Livro, CD ou DVD é obrigatoriamente vinculado a um Autor existente no banco.
- **API RESTful:** Endpoints padronizados para consumo via Frontend ou Postman/Insomnia.
- **Frontend:** Interface limpa utilizando HTML, CSS e Vanilla Javascript para consumo da API.

## 🛠️ Tecnologias Utilizadas

* **Node.js:** Ambiente de execução.
* **Express:** Framework para criação do servidor e rotas.
* **MongoDB Atlas:** Banco de dados na nuvem (NoSQL).
* **Mongoose:** ODM para modelagem dos dados.
* **JWT & Bcrypt:** Segurança e Autenticação.
* **HTML5/CSS3/JS:** Interface do usuário.

## 📂 Estrutura do Projeto

O projeto segue o padrão MVC (Model-View-Controller) para organização de código:

```text
├── public/           # Arquivos do Frontend (HTML, CSS, JS)
├── src/
│   ├── config/       # Configuração de conexão com o Banco
│   ├── controllers/  # Lógica das requisições (Regras de negócio)
│   ├── middleware/   # Verificação de token de acesso
│   ├── models/       # Schemas do Banco de Dados
│   └── routes/       # Definição das rotas da API
├── .env.example      # Exemplo das variáveis de ambiente necessárias
└── server.js         # Ponto de entrada da aplicação
```

## 🔧 Como rodar o projeto

### Pré-requisitos
* Node.js instalado na máquina.
* Uma string de conexão do MongoDB (Atlas ou Local).

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPO.git
cd NOME-DO-REPO
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as Variáveis de Ambiente**
Renomeie o arquivo `.env.example` para `.env` e preencha com suas credenciais:
```env
PORT=3000
MONGO_URI=sua_string_conexao_mongodb
JWT_SECRET=palavra_secreta_para_token
```

**4. Execute o Servidor**
```bash
node server.js
```

**5. Acesse**
Abra o navegador em: `http://localhost:3000`

---

## 📝 Rotas da API

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/auth/registrar` | Cria novo usuário | Não |
| POST | `/api/auth/login` | Faz login e recebe Token | Não |
| GET | `/api/autores` | Lista autores | Não |
| POST | `/api/autores` | Cria autor | **Sim** |
| GET | `/api/livros` | Lista livros | Não |
| POST | `/api/livros` | Cria livro (c/ ID autor) | **Sim** |
| DELETE| `/api/livros/:id` | Remove livro | **Sim** |

*(O padrão se repete para CDs e DVDs)*

---
Desenvolvido para fins acadêmicos.
