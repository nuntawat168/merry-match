import React, { useState, useEffect } from "react";
import { socket } from "../socket";

const SocketContext = React.createContext();

function SocketProvider(props) {
  const [room, setRoom] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiver-message", (newMessage) => {
      console.log("From receiver-message", newMessage);
      setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.off("receiver-message");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, room, setRoom, messages, setMessages }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

const useSocket = () => React.useContext(SocketContext);

export { SocketProvider, useSocket };
