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
<<<<<<< HEAD
- Arquivo alternativo para produção: `docker-compose.prod.yml`
=======
>>>>>>> develop

---

## 🗂️ Estrutura de Diretórios

```bash
gerenciador-despesas/
<<<<<<< HEAD
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
=======
├── backend/
│   ├── .sequelizerc
│   ├── Dockerfile
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
├── backups/
│   └── backup_despesas_db_2025-04-06_06-36-24.sql.gz
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── Dockerfile-prod
│   ├── README.md
│   ├── package-lock.json
│   └── package.json
├── scripts/
│   ├── backup/
│   ├── backup.sh
│   └── makefile-shortcuts.sh
├── .env
├── .env.example
├── .env.prod
├── .gitignore
├── Makefile
├── README.makefile.md
├── README.md
├── backup.sql
├── docker-compose.prod.yml
├── docker-compose.yml
├── package-lock.json
└── package.json
⚙️ Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com base no .env.example:
>>>>>>> develop

dotenv
Copiar
Editar
# PostgreSQL
POSTGRES_DB=despesas_db
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=database
POSTGRES_PORT=5432

<<<<<<< HEAD
## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```dotenv
# PostgreSQL
POSTGRES_DB=despesas_db
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_HOST=database
POSTGRES_PORT=5432

=======
>>>>>>> develop
# Alias usados pelo backend
DATABASE_NAME=${POSTGRES_DB}
DATABASE_USER=${POSTGRES_USER}
DATABASE_PASSWORD=${POSTGRES_PASSWORD}
DATABASE_HOST=${POSTGRES_HOST}
DATABASE_PORT=${POSTGRES_PORT}
<<<<<<< HEAD
```
=======
🚀 Como Executar o Projeto
📋 Pré-requisitos
Docker
>>>>>>> develop

Docker Compose (docker compose CLI)

<<<<<<< HEAD
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

=======
▶️ Passos
Clone o repositório:

bash
Copiar
Editar
git clone https://github.com/alisson92/gerenciador-despesas.git
cd gerenciador-despesas
Copie o arquivo de variáveis de ambiente:

bash
Copiar
Editar
cp .env.example .env
Inicie os containers:

bash
Copiar
Editar
docker compose up -d --build
Acesse os serviços:

Frontend: http://localhost:3001

Backend (API): http://localhost:3000

Documentação Swagger: http://localhost:3000/api-docs

PostgreSQL: Porta 5432 (internamente referenciado como database)

📌 Observações
Os dados persistem mesmo após reinicialização graças ao volume postgres_data.

O arquivo .env não é versionado, mas um exemplo está disponível no .env.example.

🧑‍💻 Autor
Desenvolvido por @alisson92 🚀
>>>>>>> develop
