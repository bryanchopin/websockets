import { Server } from "socket.io";

export default async function handler(req, res) {
  if (!res.socket.server) {
    return res.status(404).end();
  }
  const sharedState = {
    value: 10,
  };

  // const io = new Server(res.socket.server);

  const io = new Server(res.socket.server, {
    cors: {
      origin: "*",
    },
  });

  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("Cliente WebSocket conectado");

    socket.emit("welcome", "¡Conexión exitosa con el servidor!");

    // Escucha cuando un cliente emite el evento 'changeValue'
    socket.on("changeValue", (newValue) => {
      // Actualiza el valor compartido
      sharedState.value = newValue;

      // Emite el nuevo valor a todos los clientes conectados
      io.emit("updateValue", sharedState.value);

      console.log(`Valor actualizado a: ${sharedState.value}`);
    });

    // Maneja la desconexión de un cliente WebSocket
    socket.on("disconnect", () => {
      console.log("Cliente WebSocket desconectado");
    });
  });

  console.log("Servidor WebSocket en funcionamiento");

  res.end();
}

