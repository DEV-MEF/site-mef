FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:20-alpine AS final

WORKDIR /app

# Copia somente os arquivos necessários da etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY . .

CMD ["node", "index.js"]
