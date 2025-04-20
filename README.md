
# Gerenciador de Despesas

## 📌 Descrição

<<<<<<< HEAD
O **Gerenciador de Despesas** é uma aplicação full-stack desenvolvida para ajudar usuários a controlar suas finanças pessoais de forma simples e visual. A aplicação utiliza **React.js** no frontend, **Node.js/Express** no backend e **PostgreSQL** como banco de dados. A orquestração dos containers é feita com **Docker Compose**.
=======
O **Gerenciador de Despesas** é uma aplicação full-stack para o gerenciamento de finanças pessoais, desenvolvida para fins acadêmicos e profissionais. O projeto é composto por frontend em **React.js + Material UI**, backend em **Node.js/Express** e banco de dados **PostgreSQL**. Todos os serviços são orquestrados via **Docker Compose** com setup altamente automatizado.
>>>>>>> develop

---

## 🚀 Funcionalidades

<<<<<<< HEAD
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
- **Containerização e orquestração dos serviços**:
  - `frontend`
  - `backend`
  - `database`
- **Arquivo alternativo para produção**: `docker-compose.prod.yml`
=======
- Cadastro e login de usuários
- Dashboard visual de despesas
- Recuperação de senha ("esqueci minha senha") com e-mail, token seguro e expiração
- Padronização completa de UX/UI (Material UI)
- Boas práticas de código e segurança (senha criptografada, tokens de reset, onboarding rápido)
- Makefile com atalhos e scripts utilitários
- Ambiente multi-branch com fluxo de integração profissional (feature → develop → main)
- Setup automático via `setup.sh`
>>>>>>> develop

---

## 🛠️ Tecnologias Utilizadas

**Backend**
- Node.js + Express
- Sequelize ORM
- JWT para autenticação
- Nodemailer (envio de e-mails)
- dotenv (.env)
- CORS, Swagger

**Frontend**
- React.js
- Material UI (MUI)
- Axios
- React Router DOM

**Banco de Dados**
- PostgreSQL (volume docker)

**DevOps**
- Docker e Docker Compose
- Makefile (comandos rápidos)
- Scripts de setup e backup

---

## 🗂️ Estrutura do Projeto

<<<<<<< HEAD
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
=======
```
gerenciador-despesas/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── ...
│   └── Dockerfile
├── frontend/
│   ├── src/pages/
│   ├── src/components/
│   └── Dockerfile
├── scripts/           # utilitários extras
├── setup.sh           # script automatizador (criação de .env e setup local)
├── Makefile
├── docker-compose.yml
├── .env.example       # modelo de variáveis de ambiente
├── README.md
└── ...
```

---

## ⚡ Setup rápido (Uso recomendável com Docker)

### Pré-requisitos
- Docker e Docker Compose

### Passos

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/alisson92/gerenciador-despesas.git
   cd gerenciador-despesas
   ```

2. **(Opcional) Troque para a branch desejada:**
   ```bash
   git checkout main
   ```
   (ou `develop` para validações previas, ou outra branch de feature.)

3. **Rode o setup automatizado:**
   ```bash
   ./setup.sh
   ```
   > Isso garante a criação dos arquivos `.env`/backend e frontend.

4. **Suba os containers:**
   ```bash
   docker compose down -v
   docker compose up -d --build
   ```

5. **Acesse os serviços:**
   - Frontend: [http://localhost:3000](http://localhost:3000) *(ou :3001 se customizou)*
   - Backend: [http://localhost:3000/api-docs](http://localhost:3000/api-docs) *(Swagger)*

---

## 🔐 Fluxo de Recuperação de Senha (Reset Password)

1. Acesse "Esqueci minha senha" na tela de login.
2. Informe o e-mail cadastrado.
3. Um link de recuperação será exibido na tela (modo dev) ou enviado por e-mail (se configurar envio real).
4. Ao clicar/redefinir, o token é validado e a senha redefinida.
5. Usuário retorna para o login rapidamente (botão dedicado em todas as telas!).

### **E-mails simulados**
- Por padrão, está configurado para Ethereal, útil para testes/testes acadêmicos.
- Para uso real, configure o SMTP/Gmail/Outlook na variável de ambiente de envio.

---
>>>>>>> develop

## ⚙️ Variáveis de Ambiente

O arquivo `.env.example` já traz TODOS os campos necessários.  
**Após clonar, sempre rode `./setup.sh` para gerar corretamente os arquivos.**

Principais campos do backend:

```dotenv
POSTGRES_DB=despesas_db
POSTGRES_USER=usuario_exemplo
POSTGRES_PASSWORD=senha_exemplo
POSTGRES_HOST=database
POSTGRES_PORT=5432

<<<<<<< HEAD
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
=======
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=senha_de_app

FRONTEND_URL=http://localhost:3000
```

---

## 🛠️ Comandos Úteis (via Makefile)
>>>>>>> develop

```bash
make build        # Builda containers
make down         # Para/remover containers
make logs         # Logs dos serviços em tempo real
make backup       # Backups do banco
...
```

---

## 📌 Observações

- `.env.example` sempre atualizado no repositório; 
- `.env` NUNCA é versionado (padrão de segurança).
- O projeto está pronto para rodar e ser demonstrado em qualquer máquina/servidor.
- Todos os fluxos de UX foram revisados: sempre há um botão para retornar ou redirecionar na navegação de autenticação.

---

## 👤 Autor

<<<<<<< HEAD
Desenvolvido por [@alisson92](https://github.com/alisson92) 🚀
=======
Desenvolvido por [@alisson92](https://github.com/alisson92)  
Licença: MIT

---

>>>>>>> develop
