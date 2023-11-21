FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN vite build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]