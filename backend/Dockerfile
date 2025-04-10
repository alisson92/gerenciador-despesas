FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copia apenas o entrypoint antes de dar permissão
COPY entrypoint.sh ./entrypoint.sh
# Adiciona netcat e permissões pro entrypoint
RUN apt-get update && apt-get install -y netcat-openbsd && \
    chmod +x ./entrypoint.sh

# Agora copia o restante do projeto
COPY . .

EXPOSE 3000

CMD ["bash", "./entrypoint.sh"]

