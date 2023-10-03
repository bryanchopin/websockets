// import Head from "next/head";
// import styles from "@/styles/Home.module.css";
// import SocketIOClient from "socket.io-client";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [value, setValue] = useState(0);
//   const [socket, setSocket] = useState(null); // Estado para gestionar el socket

//   useEffect(() => {
//     // connect to socket server
//     const newSocket = SocketIOClient.connect(process.env.BASE_URL, {
//       path: "/api/socket",
//     });

//     newSocket.on("welcome", (message) => {
//       console.log(message);
//     });

//     newSocket.on("changeValue", (newValue) => {
//       setValue(newValue);
//       console.log(`Valor actualizado a: ${newValue}`);
//     });

//     newSocket.on("updateValue", (newValue) => {
//       setValue(newValue);
//       console.log(`Valor actualizado a: ${newValue}`);
//     });

//     newSocket.on("disconnect", () => {
//       console.log("Cliente WebSocket desconectado");
//       setSocket(null); // Establecer el socket en null cuando se desconecta
//     });

//     // Almacenar el socket en el estado
//     setSocket(newSocket);

//     // socket disconnet onUnmount if exists
//     if (newSocket) return () => newSocket.disconnect();
//   }, []);

//   // Función para enviar un nuevo valor al servidor
//   function handleChangeValue(newValue) {
//     if (socket) {
//       socket.emit("changeValue", newValue); // Usar socket.emit para enviar el valor al servidor
//     } else {
//       console.error("Socket no está definido");
//     }
//   }

//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <h1 style={{ color: "white" }}>Valor compartido: {value}</h1>
//       <button onClick={() => handleChangeValue(prompt("Agrega el valor"))}>
//         Actualizar Valor
//       </button>
//     </>
//   );
// }


import Head from "next/head";
import styles from "@/styles/Home.module.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

export default function Home() {
  const [value, setValue] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Conectarse al servidor WebSocket
    const newSocket = io({
      path: "/api/socket",
      cors: {
        origin: "*",
      },
    });

    newSocket.on("welcome", (message) => {
      console.log(message);
    });

    newSocket.on("changeValue", (newValue) => {
      setValue(newValue);
      console.log(`Valor actualizado a: ${newValue}`);
    });

    newSocket.on("updateValue", (newValue) => {
      setValue(newValue);
      console.log(`Valor actualizado a: ${newValue}`);
    });

    newSocket.on("disconnect", () => {
      console.log("Cliente WebSocket desconectado");
      setSocket(null); // Establecer el socket en null cuando se desconecta
    });

    // Almacenar el socket en el estado
    setSocket(newSocket);

    // Desconectar el socket al desmontar si existe
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  // Función para enviar un nuevo valor al servidor
  function handleChangeValue(newValue) {
    if (socket) {
      socket.emit("changeValue", newValue);
    } else {
      console.error("Socket no está definido");
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{ color: "white" }}>Valor compartido: {value}</h1>
      <button onClick={() => handleChangeValue(prompt("Agrega el valor"))}>
        Actualizar Valor
      </button>
    </>
  );
}
