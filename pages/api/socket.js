// // import { Server } from "socket.io";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // const sharedState = {
// //   value: 10,
// // };

// // export default async function handler(req, res) {
// //   if (!res.socket.server.io) {
// //     console.log("New Socket.io server...");

// //     // Adaptar el servidor net de Next a un servidor HTTP
// //     const httpServer = res.socket.server;
// //     const io = new Server(httpServer, {
// //       path: "/api/socket",
// //     });

// //     io.on("connection", (socket) => {
// //       console.log("Cliente WebSocket conectado");

// //       socket.emit("welcome", "¡Conexión exitosa con el servidor!");

// //       // Escucha cuando un cliente emite el evento 'changeValue'
// //       socket.on("changeValue", (newValue) => {
// //         // Actualiza el valor compartido
// //         sharedState.value = newValue;
// //         console.log(`Valor actualizado a: ${newValue}`);

// //         // Emite el nuevo valor a todos los clientes conectados
// //         io.emit("updateValue", sharedState.value);
// //       });

// //       // Maneja la desconexión de un cliente WebSocket
// //       socket.on("disconnect", () => {
// //         console.log("Cliente WebSocket desconectado");
// //       });
// //     });

// //     res.socket.server.io = io;
// //   }
// //   res.end();
// // }


// import { Server } from "socket.io";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Variable global para almacenar el servidor WebSocket
// let ioInstance = null;

// const sharedState = {
//   value: 10,
// };

// export default async function handler(req, res) {
//   if (!ioInstance) {
//     console.log("Configurando el servidor WebSocket...");

//     // Adaptar el servidor net de Next a un servidor HTTP
//     const httpServer = res.socket.server;
//     ioInstance = new Server(httpServer, {
//       path: "/api/socket",
//     });

//     ioInstance.on("connection", (socket) => {
//       console.log("Cliente WebSocket conectado");

//       socket.emit("welcome", "¡Conexión exitosa con el servidor!");

//       // Escucha cuando un cliente emite el evento 'changeValue'
//       socket.on("changeValue", (newValue) => {
//         // Actualiza el valor compartido
//         sharedState.value = newValue;
//         console.log(`Valor actualizado a: ${newValue}`);

//         // Emite el nuevo valor a todos los clientes conectados
//         ioInstance.emit("updateValue", sharedState.value);
//       });

//       // Maneja la desconexión de un cliente WebSocket
//       socket.on("disconnect", () => {
//         console.log("Cliente WebSocket desconectado");
//       });
//     });
//   }

//   res.socket.server.io = ioInstance;
//   res.end();
// }
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Variable global para almacenar el servidor WebSocket
let ioInstance = null;

const sharedState = {
  value: 10,
};

export default async function handler(req, res) {
  if (!ioInstance) {
    console.log("Configurando el servidor WebSocket...");

    // Adaptar el servidor net de Next a un servidor HTTP
    const httpServer = res.socket.server;
    ioInstance = new Server(httpServer, {
      path: "/api/socket",
    });

    ioInstance.on("connection", (socket) => {
      console.log("Cliente WebSocket conectado");

      socket.emit("welcome", "¡Conexión exitosa con el servidor!");

      if (!ioInstance) {
        // Evitar configurar más de una vez en caso de múltiples conexiones simultáneas
        return;
      }

      // Escucha cuando un cliente emite el evento 'changeValue'
      socket.on("changeValue", (newValue) => {
        // Actualiza el valor compartido
        sharedState.value = newValue;
        console.log(`Valor actualizado a: ${newValue}`);

        // Emite el nuevo valor a todos los clientes conectados
        ioInstance.emit("updateValue", sharedState.value);
      });

      // Maneja la desconexión de un cliente WebSocket
      socket.on("disconnect", () => {
        console.log("Cliente WebSocket desconectado");
      });
    });
  }

  res.socket.server.io = ioInstance;
  res.end();
}
