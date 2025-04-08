# 📄 Documentação do Makefile

Este arquivo descreve os comandos disponíveis no `Makefile` localizado na raiz do projeto **Gerenciador de Despesas**.

O uso do `Makefile` visa simplificar e padronizar ações rotineiras do desenvolvimento e manutenção do ambiente Docker.

---

## ▶️ Execução dos Comandos

Todos os comandos abaixo devem ser executados via terminal, a partir da raiz do projeto:

```bash
make <alvo>
```

---

## 🛠️ Comandos Disponíveis

### 🔧 Build e Inicialização

| Comando        | Descrição                                                                 |
|----------------|---------------------------------------------------------------------------|
| `make build`   | Executa `docker compose up -d --build` para construir e iniciar os containers. |
| `make up`      | Sobe os containers sem rebuild.                                            |

### 🛑 Encerramento e Limpeza

| Comando        | Descrição                                                                 |
|----------------|---------------------------------------------------------------------------|
| `make stop`    | Para os containers.                                                       |
| `make down`    | Remove containers, redes e volumes anônimos.                             |
| `make clean`   | Faz `docker system prune -a` para limpar imagens e volumes não utilizados (⚠️ irreversível). |

### 🔍 Logs e Status

| Comando        | Descrição                                                                 |
|----------------|---------------------------------------------------------------------------|
| `make logs`    | Mostra os logs de todos os serviços.                                      |
| `make ps`      | Lista o status dos containers em execução.                                |

### 🐘 Banco de Dados

| Comando              | Descrição                                                           |
|----------------------|----------------------------------------------------------------------|
| `make db-backup`     | Gera um backup do banco de dados atual para `./scripts/backup.sql`. |
| `make db-restore`    | Restaura o banco a partir do backup `./scripts/backup.sql`.         |

---

## 💡 Observações

- Todos os comandos assumem que o ambiente está corretamente configurado e o `.env` foi criado.
- É necessário que o Docker e Docker Compose estejam instalados e operacionais.
- Comandos como `clean` são destrutivos — use com cautela.

---

## 👨‍💻 Autor

Desenvolvido por [@alisson92](https://github.com/alisson92) 🚀
