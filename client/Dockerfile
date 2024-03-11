FROM node:18-alpine
WORKDIR /client
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000

# docker build -t chater-client .
# docker run -dp 127.0.0.1:3000:3000 chater-client