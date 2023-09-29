import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import jwtDecode from "jwt-decode";

const SocketContext = React.createContext();

function SocketProvider(props) {
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    socket.emit("setup", user);
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
