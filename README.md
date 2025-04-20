
# Gerenciador de Despesas

## 📌 Descrição

O **Gerenciador de Despesas** é uma aplicação full-stack para o gerenciamento de finanças pessoais, desenvolvida para fins acadêmicos e profissionais. O projeto é composto por frontend em **React.js + Material UI**, backend em **Node.js/Express** e banco de dados **PostgreSQL**. Todos os serviços são orquestrados via **Docker Compose** com setup altamente automatizado.

---

## 🚀 Funcionalidades

- Cadastro e login de usuários
- Dashboard visual de despesas
- Recuperação de senha ("esqueci minha senha") com e-mail, token seguro e expiração
- Padronização completa de UX/UI (Material UI)
- Boas práticas de código e segurança (senha criptografada, tokens de reset, onboarding rápido)
- Makefile com atalhos e scripts utilitários
- Ambiente multi-branch com fluxo de integração profissional (feature → develop → main)
- Setup automático via `setup.sh`

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

EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=senha_de_app

FRONTEND_URL=http://localhost:3000
```

---

## 🛠️ Comandos Úteis (via Makefile)

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

Desenvolvido por [@alisson92](https://github.com/alisson92)
Licença: MIT

---

