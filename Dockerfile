FROM node:20-alpine AS builder

WORKDIR /app
EXPOSE 3000
COPY package.json ./
RUN yarn install
# Copiar o código-fonte
COPY . .

# Rodar o build no estágio de builder
RUN npm run build

FROM node:20-alpine AS final

WORKDIR /app

# Copia somente os arquivos necessários da etapa anterior
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
# Copiar o restante dos arquivos necessários
COPY . .
CMD ["/bin/sh", "/app/bin/start.sh"]
