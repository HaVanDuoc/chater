FROM node:18-alpine
WORKDIR /server
COPY package*.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
CMD ["npm", "start"]
EXPOSE 5000

# docker build -t chater-server .
# docker run -dp 127.0.0.1:5000:5000 chater-server