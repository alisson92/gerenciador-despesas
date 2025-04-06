# Base do Node.js
FROM node:18

# Define variável de ambiente para evitar prompts interativos (como em CI/CD)
ENV CI=true

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia apenas os arquivos de dependências (mais eficiente para cache)
COPY package*.json ./

# Instala dependências de forma previsível e mais rápida
RUN npm ci

# Copia o restante do código da aplicação
COPY . .

# Expor a porta padrão do React (útil para quem roda com npm start)
EXPOSE 3000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "start"]

