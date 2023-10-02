import React from "react";
import discoverIcon from "../assets/icon/discover.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import merryHeart from "../assets/icon/merry.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/socketContext";
import { useMatch } from "../contexts/matchContext";

const DiscoverSideBar = () => {
  const { socket, room, setRoom, messages, setMessages, setContentToRender } =
    useSocket();
  const navigate = useNavigate();
  // const { setContentToRender } = useMatch();

  const [matchList, setMatchList] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [conversations, setConversations] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/conversationlist/${user.id}`
      )
      .then((response) => {
        setConversations(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [room]);

  useEffect(() => {
    if (matchList.length > 0) {
      setDisplayedUsers(matchList);
    }
  }, [matchList, currentIndex]);

  const handleNextClick = () => {
    if (currentIndex + 2 < matchList.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex >= 2) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const handleStartChat = async (conversationAndUserInfo) => {
    try {
      const conversation = {
        client1_id: conversationAndUserInfo.client1_id,
        client2_id: conversationAndUserInfo.client2_id,
        conversation_id: conversationAndUserInfo.conversation_id,
        receiver_image: conversationAndUserInfo.image,
        receiver_name: conversationAndUserInfo.name,
        receiver_id: conversationAndUserInfo.user_id,
      };

      // socket.emit("joinRoom", { conversation });
      // console.log("User has been join to room ID:", conversation);
      setRoom({ ...conversation });
      setContentToRender(`Chat-${conversation.conversation_id}`);
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/fetchMessages/${
          conversation.conversation_id
        }`
      );

      setMessages(response.data.data);
    } catch (error) {
      alert("Get History Messages Faild");
      console.log("Get History Messages Faild", error);
    }
  };

  const fetchMatchList = async (user_id) => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/matchlist/${user_id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const data = await fetchMatchList(user.id);
      setMatchList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [room]);

  const renderedChat = conversations.map((chat, index) => {
    return (
      <div
        key={index}
        className={`flex py-[16px] px-[12px] hover:cursor-pointer rounded-2xl ${
          chat.user_id === room.receiver_id
            ? `border border-purple-500 bg-gray-100`
            : null
        }`}
        onClick={() => handleStartChat(chat)}
      >
        <img
          src={chat.image[0].url}
          alt={`Profile photo of ${chat.name.split(" ")[0]}`}
          className="bg w-[60px] h-[60px] rounded-full mr-[12px]"
          style={{ objectFit: "cover" }}
        />
        <div className="flex flex-col justify-center">
          <p className="text-[16px] text-gray-900">{chat.name.split(" ")[0]}</p>
          {/* <p className='text-[14px] text-gray-700'>{chat.msg}</p> */}
        </div>
      </div>
    );
  });

  return (
    <div
      className={
        location.pathname === "/match"
          ? "pt-[90px] bg-white w-[316px] flex flex-col"
          : "bg-white w-[316px] flex flex-col"
      }
    >
      <button
        onClick={() => {
          setContentToRender("Matching");
        }}
        className="flex flex-col justify-center items-center w-[275px] p-2 border-[2px] rounded-xl border-purple-500 m-[20px] hover:bg-purple-200"
      >
        <img
          className="w-[66.33px] mt-[30px]"
          src={discoverIcon}
          alt="Discover Icon"
        />
        <p className="text-[24px] font-bold text-red600">Discover New Match</p>
        <p className="text-[14px] mb-[30px] text-gray-600 text-center">
          Start find and Merry to get know and connect with new friend!
        </p>
      </button>
      <div>
        <p className="text-left ml-[20px] font-bold text-[24px]">
          Merry Match!
        </p>
        <div className="flex overflow-x-auto ml-[16px]">
          {displayedUsers.map((user, index) => (
            <div
              key={index}
              className={`flex ${index === 0 ? "" : ""} shrink-0 mb-3`}
            >
              <button>
                <div className="relative">
                  <div className="flex justify-end relative left-[75px] bottom-[-100px] w-[34px] h-[20px]">
                    <img
                      src={merryHeart}
                      alt="heart"
                      className="z-10 absolute right-[10px] w-[20px] h-[20px]"
                    />
                    <img
                      src={merryHeart}
                      alt="heart"
                      className="z-30 w-[20px] h-[20px]"
                    />
                  </div>
                  <img
                    src={user.image[0].url}
                    alt={user.name}
                    className="w-[100px] h-[100px] rounded-3xl ml-[10px]"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="px-[16px] text-left font-bold text-[24px] text-gray-900 mb-[16px] mt-[18px]">
        Chat with Merry Match
      </p>
      <section className="px-[16px] overflow-y-auto">
        <div>{renderedChat}</div>
      </section>
    </div>
  );
};

export default DiscoverSideBar;
