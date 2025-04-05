
# Gerenciador de Despesas - Documentação

## **Descrição do Projeto**
O **Gerenciador de Despesas** é uma aplicação full-stack que permite ao usuário gerenciar suas finanças de maneira eficiente, com uma interface amigável e recursos robustos para armazenar e visualizar dados financeiros. A arquitetura do projeto segue uma abordagem modular, separando o **frontend**, **backend** e **banco de dados**, enquanto utiliza o **Docker Compose** para orquestrar os serviços.

---

## **Tecnologias Utilizadas**

### **1. Backend**
O backend do projeto é responsável por gerenciar a lógica da aplicação, expor APIs REST e lidar com a interação com o banco de dados. As principais tecnologias utilizadas são:
- **Node.js**:
  - Ambiente de execução JavaScript para o backend.
- **Express.js**:
  - Framework para construção de APIs RESTful.
- **Sequelize**:
  - ORM (Object Relational Mapper) que facilita a interação com o banco de dados.
- **PostgreSQL Client (pg)**:
  - Biblioteca para conectar e interagir com o banco PostgreSQL.
- **Sequelize CLI**:
  - Ferramenta de linha de comando para gerenciamento de migrações e modelos.
- **dotenv**:
  - Gerenciamento de variáveis de ambiente.
- **CORS (Cross-Origin Resource Sharing)**:
  - Configuração para permitir que o frontend interaja com as APIs do backend.

---

### **2. Frontend**
O frontend é baseado na biblioteca **React.js**, fornecendo uma interface rica e dinâmica para o usuário. As tecnologias utilizadas incluem:
- **React.js**:
  - Biblioteca principal para construção de interfaces de usuário.
- **React Router DOM**:
  - Roteamento para gerenciamento de páginas e navegação.
- **Material-UI (MUI)**:
  - Componentes pré-construídos e estilizados com base no design system do Google (Material Design):
    - `@mui/material`: Componentes de interface.
    - `@mui/icons-material`: Ícones.
- **Axios**:
  - Biblioteca para consumo de APIs REST.
- **Bootstrap**:
  - Framework CSS para estilização responsiva.
- **Recharts**:
  - Biblioteca para criação de gráficos interativos e visualização de dados.
- **Emotion**:
  - Biblioteca de estilização (CSS-in-JS) integrada com o Material-UI.
- **React Testing Library**:
  - Ferramentas de teste para validar os comportamentos dos componentes.
  - Principais pacotes:
    - `@testing-library/react`: Testes de componentes React.
    - `@testing-library/jest-dom`: Hooks de teste para o DOM.
    - `@testing-library/user-event`: Simulação de ações do usuário.

---

### **3. Banco de Dados**
O projeto utiliza o banco de dados **PostgreSQL** para armazenar e gerenciar os dados financeiros. O container do PostgreSQL é configurado via Docker Compose.
- **PostgreSQL**:
  - Banco de dados relacional robusto e amplamente utilizado.
- **Configuração do Banco via Docker Compose:**
  - Usuário do banco: `root`
  - Senha: `root`
  - Banco inicial: `despesas_db`
  - Persistência: Os dados são armazenados em um volume Docker (`postgres_data`).

---

### **4. Docker (Orquestração e Containerização)**
A aplicação é orquestrada usando **Docker Compose**, o que facilita o gerenciamento e o deployment dos três serviços principais: **frontend**, **backend** e **banco de dados**. Cada serviço possui seu próprio container Docker.

- **Configuração:**
  - Cada parte do sistema (frontend, backend e banco de dados) é isolada em um container separado.
  - Containers definidos no arquivo `docker-compose.yml` com suporte a volumes persistentes e variáveis de ambiente.

- **Serviços Definidos:**
  1. **Frontend**:
     - Porta local: `3001`.
     - Baseado em React, conforme definido pelo `Dockerfile` no diretório `frontend`.
  2. **Backend**:
     - Porta local: `3000`.
     - Responsável pelos endpoints da API.
     - Configurado com as variáveis de ambiente para integração ao banco de dados.
  3. **Banco de Dados (PostgreSQL)**:
     - Porta local: `5432`.
     - Volume persistente para garantir que os dados sejam preservados mesmo após a reinicialização do container.

---

## **Como Rodar o Projeto**

### **Pré-Requisitos**
1. Docker instalado [Instruções de instalação](https://docs.docker.com/get-docker/).
2. Docker Compose instalado.

### **Passos para Execução**
1. Clone o repositório:
   ```bash
   git clone git@github.com:alisson92/gerenciador-despesas.git
   cd gerenciador-despesas
   ```

2. Inicie os serviços (frontend, backend e banco de dados):
   ```bash
   docker-compose up --build
   ```

3. Acessar os serviços:
   - Frontend: [http://localhost:3001](http://localhost:3001)
   - Backend: [http://localhost:3000](http://localhost:3000)
   - Banco de Dados (PostgreSQL): Porta `5432`.

---

## **Estrutura de Diretórios**
```plaintext
gerenciador-despesas/
├── backend/         # Código do backend (Node.js, Express, Sequelize)
│   ├── package.json
│   └── Dockerfile
├── frontend/        # Código do frontend (React.js)
│   ├── public/      # Recursos estáticos
│   ├── src/         # Código-fonte principal
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml  # Configuração para orquestração Docker
└── README.md        # Documentação do projeto
```

---

## **Variáveis de Ambiente**
Essas variáveis estão configuradas no `docker-compose.yml` e usadas no backend para se comunicar com o PostgreSQL:
- **DATABASE_NAME**: `despesas_db`
- **DATABASE_USER**: `root`
- **DATABASE_PASSWORD**: `root`
- **DATABASE_HOST**: `database` (nome do container do banco de dados).
- **DATABASE_PORT**: `5432`.

---

