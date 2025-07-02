FROM node:20-alpine AS builder

WORKDIR /opt/app
EXPOSE 3000
COPY package.json ./
RUN yarn install --no-cache
# Copiar o código-fonte
COPY . .

# Rodar o build no estágio de builder
RUN npm run build

FROM node:20-alpine AS final

RUN apk add --no-cache postgresql-client bash


WORKDIR /opt/app

# Copia somente os arquivos necessários da etapa anterior
COPY --from=builder /opt/app/node_modules /opt/app/node_modules
COPY --from=builder /opt/app/.next /opt/app/.next
# Copiar o restante dos arquivos necessários
COPY . .
CMD ["/bin/sh", "/opt/app/bin/start.sh"]
