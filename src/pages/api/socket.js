import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket Already Setup");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
    });
  });

  console.log("Setting Up Socket.io");
  res.end();
}