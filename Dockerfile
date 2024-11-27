FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY .env ./

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package*.json ./

RUN npm install --only=production

ENV NODE_ENV=production

EXPOSE 3003

CMD ["node", "dist/main"]
