FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de configuração do projeto
COPY package*.json ./

# Instala as dependências do Node.js
RUN npm install

# Copia o código do backend
COPY . .

# Porta usada pelo backend
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
