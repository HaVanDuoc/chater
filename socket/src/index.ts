import { Server, Socket } from "socket.io";
import express from "express";
import http from "http";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 9000;

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`[socket] Socket running on port ${PORT}`);
});
