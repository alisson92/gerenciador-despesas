# 📦 Documentação do Makefile

Este arquivo documenta todos os atalhos disponíveis no `Makefile` do projeto **Gerenciador de Despesas**. Os comandos são utilizados para facilitar a execução de tarefas comuns de desenvolvimento, produção, manutenção e backup.

---

## 🧰 Pré-Requisitos

Antes de utilizar o `Makefile`, certifique-se de que os seguintes itens estão instalados:

- `make`
- `docker`
- `docker-compose`

---

## 🚀 Comandos Disponíveis

### 🎯 Ambiente de Desenvolvimento

```bash
make up
```
> Sobe os containers definidos no `docker-compose.yml`.

```bash
make down
```
> Encerra os containers do ambiente de desenvolvimento.

```bash
make logs
```
> Exibe os logs do ambiente em tempo real.

```bash
make ps
```
> Mostra o status dos containers (ativos, pausados, etc).

---

### 🧪 Ambiente de Produção

```bash
make up-prod
```
> Sobe os containers definidos no `docker-compose.prod.yml`.

---

### 💾 Backup e Restauração (Ambiente de Desenvolvimento)

```bash
make backup
```
> Realiza um backup do banco de dados PostgreSQL (dev).

```bash
make restore
```
> Restaura o backup salvo anteriormente (dev).

---

### 💾 Backup e Restauração (Ambiente de Produção)

```bash
make backup-prod
```
> Realiza backup do banco em ambiente de produção.

```bash
make restore-prod
```
> Restaura backup no ambiente de produção.

---

### 🧹 Limpeza de Recursos

```bash
make prune
```
> Remove containers, redes e volumes não utilizados.

---

### 📋 Ajuda

```bash
make help
```
> Exibe todos os comandos disponíveis com descrição formatada.

---

## 📂 Estrutura do Projeto com Makefile

```plaintext
gerenciador-despesas/
├── Makefile                # Este arquivo define todos os comandos
├── docker-compose.yml      # Orquestração Dev
├── docker-compose.prod.yml # Orquestração Prod
├── scripts/                # Scripts de backup/restauração
│   ├── backup.sh
│   └── restore.sh
```

---

## ✨ Dica

Você pode digitar apenas `make` para ver todos os comandos disponíveis. Isso é possível graças ao comando `make help`.

---

## 🔐 Notas de Segurança

- Certifique-se de não expor backups com dados sensíveis em ambientes públicos.
- Utilize variáveis de ambiente seguras no `docker-compose.prod.yml` ao usar em produção.

