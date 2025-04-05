# Base do Node.js
FROM node:18

# Diretório de trabalho no container
WORKDIR /usr/src/app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o código do frontend para dentro do contêiner
COPY . .

# Expor a porta 3000 (React roda nesta porta por padrão)
EXPOSE 3000

# Comando para iniciar a aplicação React
CMD ["npm", "start"]
