FROM node:gallium-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i

## COPY .env ./

COPY . .
RUN npm run build

FROM node:gallium-alpine
WORKDIR /app

RUN apk add tzdata && \
  cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
  apk del tzdata


COPY package*.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
## COPY --from=builder /app/.env ./

CMD ["node", "dist/main"]
