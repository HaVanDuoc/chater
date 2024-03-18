FROM node:18-alpine as build
WORKDIR /client
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /client/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t chater-client .
# docker run -dp 127.0.0.1:80:80 chater-client