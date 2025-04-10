FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Adiciona netcat e permissões pro entrypoint
RUN apt-get update && apt-get install -y netcat-openbsd && \
    chmod +x ./entrypoint.sh

COPY . .

EXPOSE 3000

# Usa script como entrypoint
CMD ["./entrypoint.sh"]

