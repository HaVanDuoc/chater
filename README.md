# Chater - Chat Website

## Introduction

Chater is a realtime web chat application built with React, Node.js, and Socket.io. The project is created with the goal of providing an online chat platform, allowing users to communicate with each other quickly and conveniently.

## Features

- User authentication and authorization
- Realtime Chat
- User Profiles
- Friend List
- Notification

## Technologies Used

- Frontend:
  - React
  - React Router
  - Redux (Redux-saga)
  - Ant Design
  - Axios (for HTTP request)
- Backend:
  - Nodejs
  - Express
  - MongoDB
  - Passportjs (for authentication)
- Languages
  - Typescript
- Others:
  - SocketIO (for realtime app)
  - Docker

## Installation

1. Clone the repository:

```
git clone https://github.com/HaVanDuoc/chater.git
```

2. Install dependencies for the frontend and backend:

- Open in Integrated Terminal at chater directory

```
cd ./client
npm install
cd ../server
npm install
cd ../socket
npm install
```

3. Set up environment variables:

- Create a `.env` file in the `client`, `server` and `socket` directories.

```
# .env client
REACT_APP_PUBLIC_FOLDER = http://localhost:3000
REACT_APP_SERVER_HOST = http://localhost:5000/api
REACT_APP_SERVER_URL = http://localhost:5000
REACT_APP_SOCKET_URL = http://localhost:4000
```

```
# .env server
PORT = 5000
MONGO_URI = mongodb+srv://havanduocdev:9C139LlSzdPFG2IG@cluster0.dm5apdb.mongodb.net/?retryWrites=true&w=majority
JWT_PRIVATE_KEY = CHATERHAVANDUOC
CLIENT_URL = http://localhost:3000
CLIENT_PORT = 3000
SERVER_URL = http://localhost:5000
SERVER_PORT = 5000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SECRET_KEY=slkdfjsdlkfj_slkfjsl_kwjr
```

```
# .env socket
PORT = 4000
CLIENT_URL = http://localhost:3000
SERVER_URL = http://localhost:5000
```

4. Run the frontend client, backend servers and socket:

- Open in Integrated Terminal at `client` directory

```
npm start
```

- And open in Integrated Terminal at `server` directory

```
npm start
```

- Finally, open in Integrated Terminal at `socket` directory

```
npm start
```

5.  Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Or Installation With Docker

1. Requisitely, installed and running Docker

2. Open in Integrated Terminal at root directory `chater`

```
docker compose -p chater up -d
```

## Deploying

Project demo are deployed at https://chater-yvka.onrender.com/

## Demo

### 1. Login page

![Login page](/client/public/assets/1.png)

### 2. User page

![User page](/client/public/assets/2.png)

![User page](/client/public/assets/3.png)

### 3. Chat of 2 users

![Chat of 2 users](/client/public/assets/4.png)
