FROM node:18-alpine
WORKDIR /socket
COPY package*.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD ["npm", "start"]
EXPOSE 4000

# docker build -t chater-socket .
# docker run -dp 127.0.0.1:4000:4000 chater-socket