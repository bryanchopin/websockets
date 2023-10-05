import { Server as ServerIO } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const NetServer = res.socket.server;
    const io = new ServerIO(NetServer, {
      path: "/api/socket",
    });

    io.on("connect", (socket) => {
      console.log("Client WebSocket connected", socket.id);

      socket.on("disconnect", () => {
        console.log("Client WebSocket disconnected", socket.id);
      });

      socket.on("changeValue", (newValue) => {
        console.log(`Received "changeValue" event with value: ${newValue}`);
        io.emit("updateValue", newValue);
      });
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
}
