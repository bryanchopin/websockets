import { Server as SocketServer } from "socket.io";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const sharedState = {
  value: 10,
};

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");

    // Adaptar el servidor net de Next a un servidor HTTP
    const httpServer = res.socket.server;
    const io = new SocketServer(httpServer, {
      path: "/api/socket",
    },
    {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Cliente WebSocket conectado");

      socket.emit("welcome", "¡Conexión exitosa con el servidor!");

      // Escucha cuando un cliente emite el evento 'changeValue'
      socket.on("changeValue", (newValue) => {
        // Actualiza el valor compartido
        sharedState.value = newValue;
        console.log(`Valor actualizado a: ${newValue}`);

        // Emite el nuevo valor a todos los clientes conectados
        io.emit("updateValue", sharedState.value);
      });

      // Maneja la desconexión de un cliente WebSocket
      socket.on("disconnect", () => {
        console.log("Cliente WebSocket desconectado");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
}
