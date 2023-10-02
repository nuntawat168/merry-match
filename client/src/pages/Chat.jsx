import sendIcon from "../assets/icon/send button.png";
import uploadPhotoIcon from "../assets/icon/upload image.png";
import merryHeart from "../assets/icon/merry.png";
import { useEffect, useState, useRef } from "react";
import { useSocket } from "../contexts/socketContext";
import jwtDecode from "jwt-decode";
import axios from "axios";

function Chat(props) {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const { socket, messages, setMessages, room, setRoom, setContentToRender } =
    useSocket();

  const [inputMessage, setInputMessage] = useState("");
  const [senderId, setSenderId] = useState();
  const [receiverId, setReceiverId] = useState();
  const [loadingChat, setLoadingChat] = useState(false);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  async function sendMessage() {
    if (inputMessage !== "") {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const newMessage = {
        sender_id: senderId,
        receiver_id: receiverId,
        text: inputMessage,
        conversation_id: room.conversation_id,
      };
      socket.emit("send-message", newMessage);

      setMessages((message) => [...message, newMessage]);
      setInputMessage("");
      try {
        const respones = await axios.post(
          "https://merry-match.onrender.com/user/messages",
          newMessage
        );
      } catch (error) {
        alert("Store Message Faild");
        console.log("Store Message Faild", error);
      }
    }
    return true;
  }

  useEffect(() => {
    setSenderId(user.id);
    if (room.client1_id !== user.id) {
      setReceiverId(room.client1_id);
    } else if (room.client2_id !== user.id) {
      setReceiverId(room.client2_id);
    }
  }, [props.room]);

  useEffect(() => {
    console.log("chat is mount");
    return () => {
      setRoom({});
      setContentToRender("Matching");
      console.log("chat is unmount");
    };
  }, []);

  useEffect(() => {
    // ... (other useEffect code)

    // Scroll to the bottom when messages change
    scrollToBottom();

    return () => {
      // ... (other cleanup code)
    };
  }, [messages]); // Add messages as a dependency

  function StartMatchingMsg() {
    {
      /* show matching matching msg */
    }
    return (
      <div className="bg-purple-100 w-[749px] h-[90px] p-[24px] rounded-2xl flex justify-center text-red-700 text-[14px] font-semibold mt-[48px] absolute top-[50px] left-1/2 transform -translate-x-1/2">
        <div className="flex justify-end relative">
          <img
            src={merryHeart}
            alt="heart"
            className="z-10 absolute right-[20px] w-[35px] h-[35px]"
          />
          <img
            src={merryHeart}
            alt="heart"
            className="z-30 w-[35px] h-[35px]"
          />
        </div>
        <div className="pl-[24px]">
          <p>Now you and {mockData.username} are Merry Match!</p>
          <p>
            You can message something nice and make a good conversation. Happy
            Merry!
          </p>
        </div>
      </div>
    );
  }

  function renderMsg(conversation, index) {
    if (conversation.sender_id !== user.id) {
      const receiverImage =
        room?.receiver_image && room?.receiver_image[0]?.url;
      return (
        <div className=" text-[16px] text-black flex  items-center" key={index}>
          <img
            src={receiverImage || ""}
            alt={room?.receiver_name}
            className="w-[40px] h-[40px] rounded-full mr-[12px]"
          />
          <p className="py-[16px] px-[24px] bg-purple-200 rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[0px] border-[1px] border-gray-300 ">
            {conversation.text}
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-end" key={index}>
          <div className="w-auto py-[16px] px-[24px] bg-purple-600 rounded-tl-[24px] rounded-tr-[24px] rounded-br-[0px] rounded-bl-[24px]">
            {conversation.text}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="h-full bg text-white w-full flex flex-col justify-end pt-28">
      <div className="max-h-full flex flex-col justify-center pt-2">
        <section
          ref={chatContainerRef}
          className="flex-grow px-[60px] space-y-4 pt-[98px] pb-10 overflow-y-auto "
        >
          {messages.map((conversation, index) => {
            return renderMsg(conversation, index);
          })}
        </section>
      </div>

      {/* text input field */}
      <section className="bg border-t-[1px] border-gray-800 h-[100px] px-[60px] w-full flex justify-between items-center flex-shrink-0">
        <div className="flex items-center w-full h-full">
          <input
            className="bg h-full w-full grow text-gray-500 text-[16px] pl-[24px] focus:outline-0"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return sendMessage();
              }
            }}
            placeholder="Message here..."
          />
        </div>
        <div>
          <button onClick={sendMessage}>
            <img src={sendIcon} alt="send icon" className="w-[48px] h-[48px]" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Chat;
