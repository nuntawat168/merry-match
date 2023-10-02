import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import jwtDecode from "jwt-decode";
import axios from "axios";

const SocketContext = React.createContext();
var compareRoom;

function SocketProvider(props) {
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [contentToRender, setContentToRender] = useState("Matching");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    socket.emit("setup", user);
  }, []);

  useEffect(() => {
    socket.on("receiver-message", async (newMessage) => {
      // console.log("From receiver-message:", newMessage);
      // console.log("Current Room:", compareRoom);
      // console.log("messages ->", messages);
      // const location = useLocation();
      // console.log("location:", location);
      if (newMessage.sender_id == compareRoom.receiver_id) {
        setMessages((messages) => [...messages, newMessage]);
      } else {
        // console.log("You got a new message:", newMessage);
        const conversation = await getConversation(newMessage.conversation_id);
        const notification = {
          type: "newMessage",
          content: { messages: newMessage, conversation },
        };
        setNotifications((prev) => [notification, ...prev]);
      }
      // setMessages((messages) => [...messages, newMessage]);
    });

    return () => {
      socket.off("receiver-message");
      // setRoom({});
    };
  }, []);

  useEffect(() => {
    compareRoom = room;
  }, [room]);

  const getConversation = async (conversation_id) => {
    try {
      const fetchConversation = await axios.get(
        `https://merry-match.onrender.com/user/conversation/${conversation_id}`
      );

      const conversation = fetchConversation.data.data;
      console.log("You got to go to conversation->", conversation);
      // const conversation = {
      //   client1_id: conversationAndUserInfo.client1_id,
      //   client2_id: conversationAndUserInfo.client2_id,
      //   conversation_id: conversationAndUserInfo.conversation_id,
      //   receiver_image: conversationAndUserInfo.image,
      //   receiver_name: conversationAndUserInfo.name,
      //   receiver_id: conversationAndUserInfo.user_id,
      // };

      // socket.emit("joinRoom", { conversation });
      // console.log("User has been join to room ID:", conversation);
      // setRoom({ ...conversation });
      // setContentToRender(`Chat-${conversation.conversation_id}`);
      // const response = await axios.get(
      //   `https://merry-match.onrender.com/user/fetchMessages/${conversation.conversation_id}`
      // );

      // setMessages(response.data.data);
      return conversation;
    } catch (error) {
      alert("Get Conversation Faild");
      console.log("Get Conversation Faild", error);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        room,
        setRoom,
        messages,
        setMessages,
        notifications,
        setNotifications,
        getConversation,
        contentToRender,
        setContentToRender,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

const useSocket = () => React.useContext(SocketContext);

export { SocketProvider, useSocket };
