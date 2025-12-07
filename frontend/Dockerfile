# Etapa 1: Build Angular
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir com NGINX
FROM nginx:alpine

# Copia sua configuração customizada
COPY nginx.conf /etc/nginx/nginx.conf

# Copia o build do Angular
COPY --from=builder /app/dist/Condominium-Management-System/browser /usr/share/nginx/html

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]

