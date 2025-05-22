
# Gerenciador de Despesas – Guia de Implantação

Este documento apresenta uma visão abrangente dos elementos necessários para a implantação do projeto **"Gerenciador de Despesas"**. O objetivo é detalhar os requisitos de hardware e software, bem como o processo prático para tornar a aplicação funcional.

---

## 1. Visão Geral da Implantação

A implantação do "Gerenciador de Despesas" visa tornar a aplicação funcional e acessível. O processo é desenhado para ser eficiente e replicável, tirando proveito das tecnologias de conteinerização com Docker e Docker Compose.

---

## 2. Requisitos de Hardware

**Para desenvolvimento ou produção:**

- **CPU**: Mínimo 2 núcleos (4+ recomendados para produção)
- **Memória RAM**: Mínimo 4 GB (8+ GB recomendados)
- **Armazenamento**: Mínimo 20 GB (preferencialmente SSD)
- **Rede**: Conexão estável (1 Gbps padrão em servidores)

---

## 3. Requisitos de Software

### 3.1. Sistema Operacional

- **Desenvolvimento**: Windows 10/11 (com WSL2), macOS, Linux (Ubuntu, Fedora, etc.)
- **Produção**: Linux (Ubuntu Server LTS, Debian)

### 3.2. Tecnologias do Projeto (via Docker)

**Backend:**

- Node.js 18+
- Express
- Sequelize ORM
- JWT
- Nodemailer
- Outras libs: `dotenv`, `cors`, `swagger-ui-express`

**Frontend:**

- React.js
- Material UI
- Axios
- React Router DOM

**Banco de Dados:**

- PostgreSQL 14+ (com volume persistente)

### 3.3. Ferramentas Essenciais

- Docker 20.10+
- Docker Compose 1.29+ ou versão 2 integrada

---

## 4. Processo de Implantação Local (Setup Rápido)

### Pré-requisitos

- Docker e Docker Compose instalados

### Passos

```bash
git clone https://github.com/alisson92/gerenciador-despesas.git
cd gerenciador-despesas
git checkout main   # ou develop, ou outra branch
```

Execute o setup:

```bash
./setup.sh
```

Suba os containers:

```bash
docker compose down -v
docker compose up -d --build
```

### Acessos

- **Frontend**: http://localhost:3001  
- **Backend (Swagger)**: http://localhost:3000/api-docs

---

## 5. Variáveis de Ambiente

- Os arquivos `.env` são gerados a partir do `.env.example` com o script `setup.sh`
- Nunca são versionados no Git

### Exemplo:

```env
POSTGRES_DB=despesas_db
POSTGRES_USER=usuario_exemplo
POSTGRES_PASSWORD=senha_exemplo
POSTGRES_HOST=database
POSTGRES_PORT=5432

EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=senha_de_app
FRONTEND_URL=http://localhost:3001
```

---

## 6. Considerações para Produção

- Configuração de **domínios e SSL/TLS**
- Otimização com **Nginx**, cache, compressão
- **Monitoramento e logs**
- **Backups e recuperação**
- Gestão de segredos com **AWS Secrets Manager**, **Vault**, etc.

---

