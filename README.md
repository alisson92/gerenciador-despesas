# Gerenciador de Despesas

## 📌 Descrição

O **Gerenciador de Despesas** é uma aplicação full-stack desenvolvida com o objetivo de ajudar usuários a controlar suas finanças pessoais de maneira simples e visual. Utiliza **React.js** no frontend, **Node.js/Express** no backend e **PostgreSQL** como banco de dados, com **Docker Compose** para orquestração.

---

## 🧰 Tecnologias Utilizadas

### 🔙 Backend
- **Node.js + Express.js** — Criação de APIs RESTful
- **Sequelize ORM** — Modelagem e migração de dados
- **dotenv** — Carregamento de variáveis de ambiente
- **pg (PostgreSQL client)** — Integração com PostgreSQL
- **CORS** — Comunicação segura entre frontend e backend
- **Swagger UI** — Documentação interativa da API ([http://localhost:3000/api-docs](http://localhost:3000/api-docs))

### 🖥️ Frontend
- **React.js** — Interface de usuário
- **React Router DOM** — Roteamento SPA
- **Axios** — Requisições HTTP
- **MUI (Material-UI)** + **Emotion** — Estilização
- **Recharts** — Visualização gráfica de dados
- **Bootstrap** — Layouts responsivos
- **React Testing Library** — Testes de componentes React

### 🗄️ Banco de Dados
- **PostgreSQL** — Banco relacional para persistência de dados
- **Armazenamento persistente via volume Docker** (`postgres_data`)

### 🐳 Docker e Docker Compose
- Containerização e orquestração dos serviços:
  - `frontend`
  - `backend`
  - `database`
- Arquivo alternativo para produção: `docker-compose.prod.yml`

---

## 🗂️ Estrutura de Diretórios

```bash
gerenciador-despesas/
├── backend/              # Backend (Node.js, Express, Sequelize)
│   ├── Dockerfile
│   └── ...
├── frontend/             # Frontend (React.js)
│   ├── Dockerfile
│   └── ...
├── scripts/              # Scripts auxiliares (backup, restauração etc.)
├── postgres_data/        # Volume persistente para banco de dados
├── docker-compose.yml    # Orquestração dos containers
├── docker-compose.prod.yml # Arquivo de orquestração para produção
├── .env.example          # Exemplo de variáveis de ambiente
├── Makefile              # Script facilitador para comandos comuns
└── README.md             # Documentação
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```dotenv
# PostgreSQL
POSTGRES_DB=despesas_db
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=database
POSTGRES_PORT=5432

# Alias usados pelo backend
DATABASE_NAME=${POSTGRES_DB}
DATABASE_USER=${POSTGRES_USER}
DATABASE_PASSWORD=${POSTGRES_PASSWORD}
DATABASE_HOST=${POSTGRES_HOST}
DATABASE_PORT=${POSTGRES_PORT}
```

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos
- Docker
- Docker Compose (`docker compose` CLI)

### ▶️ Passos

1. Clone o repositório:

```bash
git clone https://github.com/alisson92/gerenciador-despesas.git
cd gerenciador-despesas
```

2. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

3. Inicie os containers:

```bash
docker compose up -d --build
```

4. Acesse os serviços:

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend (API): [http://localhost:3000](http://localhost:3000)
- Documentação Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- PostgreSQL: Porta `5432` (internamente referenciado como `database`)

---

## 📂 Scripts Auxiliares

O diretório `scripts/` contém utilitários úteis, como:

- `backup.sql`: exportação inicial do banco de dados.
- Outros scripts podem ser utilizados em processos de CI/CD ou automações.

---

## 🛠️ Makefile (Comandos Rápidos)

O projeto conta com um `Makefile` com atalhos úteis. Exemplo:

```bash
make build      # Compila e sobe os containers
make down       # Para e remove os containers
make logs       # Visualiza os logs do Docker
```

---

## 📌 Observações

- Os dados persistem mesmo após reinicialização graças ao volume `postgres_data`.
- O arquivo `.env` **não é versionado**, mas um exemplo está disponível no `.env.example`.

---

## 🧑‍💻 Autor

Desenvolvido por [@alisson92](https://github.com/alisson92) 🚀

