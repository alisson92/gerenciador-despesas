FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copia apenas o entrypoint antes de dar permissão
COPY entrypoint.sh ./entrypoint.sh
RUN apt-get update && apt-get install -y netcat-openbsd && \
    chmod +x ./entrypoint.sh

# Agora copia o restante do projeto
COPY . .

EXPOSE 3000

CMD ["./entrypoint.sh"]

