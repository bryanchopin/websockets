// import { Server as SocketServer } from "socket.io";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const sharedState = {
//   value: 10,
// };

// export default async function handler(req, res) {
//   if (!res.socket.server.io) {
//     console.log("New Socket.io server...");

//     // Adaptar el servidor net de Next a un servidor HTTP
//     const httpServer = res.socket.server;
//     const io = new SocketServer(httpServer, {
//       path: "/api/socket",
//     },
//     {
//       cors: {
//         origin: "*",
//       },
//     });

//     io.on("connection", (socket) => {
//       console.log("Cliente WebSocket conectado");

//       socket.emit("welcome", "¡Conexión exitosa con el servidor!");

//       // Escucha cuando un cliente emite el evento 'changeValue'
//       socket.on("changeValue", (newValue) => {
//         // Actualiza el valor compartido
//         sharedState.value = newValue;
//         console.log(`Valor actualizado a: ${newValue}`);

//         // Emite el nuevo valor a todos los clientes conectados
//         io.emit("updateValue", sharedState.value);
//       });

//       // Maneja la desconexión de un cliente WebSocket
//       socket.on("disconnect", () => {
//         console.log("Cliente WebSocket desconectado");
//       });
//     });

//     res.socket.server.io = io;
//   }
//   res.end();
// }

// import { Server as ServerIO } from "socket.io";
// import { Server as NetServer } from "http";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler (req, res) {
//   if (!res.socket.server.io) {
//     console.log("New Socket.io server...");
//     // adapt Next's net Server to http Server
//     const NetServer = res.socket.server;
//     const io = new ServerIO(NetServer, {
//       path: "/api/socket",
//     });

//     io.on("connect", (socket) => {
//       console.log("Client WebSocket connected", socket.id);


//       socket.on("disconnect", () => {
//         console.log("Client WebSocket disconnected",socket.id);
//       });
//     }

//     );
//     // append SocketIO server to Next.js socket server response
//     res.socket.server.io = io;
//   }
//   res.end();
// };



import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler (req, res) {
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
    }); // <- Agregué un paréntesis de cierre aquí

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
};
