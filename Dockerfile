FROM node:18-bullseye AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-bullseye-slim

WORKDIR /usr/src/app

RUN groupadd --system nodejs && useradd --system --gid nodejs nodejs
USER nodejs

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD [ "node", "-e", "require('http').get('http://localhost:3000', (res) => process.exit(res.statusCode == 200 ? 0 : 1))" ]

CMD [ "node", "dist/server.js" ]