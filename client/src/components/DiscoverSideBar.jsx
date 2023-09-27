import React from "react";
import discoverIcon from "../assets/icon/discover.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import merryHeart from "../assets/icon/merry.png";
import { useSocket } from "../contexts/socketContext";
import { useNavigate } from "react-router-dom";
import { useMatch } from "../contexts/matchContext";

const DiscoverSideBar = () => {
  const { socket, room, setRoom } = useSocket();
  const navigate = useNavigate();
  const { setContentToRender } = useMatch();

  const [matchList, setMatchList] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios
      .get(`http://localhost:4000/user/conversationlist/${user.id}`)
      .then((response) => {
        setConversations(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (matchList.length > 0) {
      setDisplayedUsers(matchList.slice(currentIndex, currentIndex + 2));
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

  const handleStartChat = (conversationAndUserInfo) => {
    const conversation = {
      client1_id: conversationAndUserInfo.client1_id,
      client2_id: conversationAndUserInfo.client2_id,
      conversation_id: conversationAndUserInfo.conversation_id,
    };
    socket.emit("joinRoom", { conversation });
    setRoom(conversation);
    setContentToRender(`Chat-${conversation.conversation_id}`);
  };

  const fetchMatchList = async (user_id) => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const response = await axios.get(
        `http://localhost:4000/user/matchlist/${user_id}`
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
  }, []);

  return (
    <div className="h-[936px] bg-[#ffff] w-[316px] flex flex-col justify-between">
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
        <div className="flex flex-wrap">
          {displayedUsers.map((user, index) => (
            <div key={index} className="flex">
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
                    className="w-[100px] h-[100px] rounded-xl ml-[10px]"
                  />
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center p-4">
          <button
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            className="text-xl"
          >
            Previous
          </button>
          <button
            onClick={handleNextClick}
            disabled={currentIndex + 2 >= matchList.length}
            className="text-xl"
          >
            Next
          </button>
        </div>
      </div>
      <div>
        <p className="text-left ml-[20px] font-bold text-[24px]">
          Chat with Merry Match
        </p>
        <div>
          <ul>
            {conversations.map((conversation, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleStartChat(conversation)}
                >
                  {conversation.name} - {conversation.about_me}
                  <img
                    src={conversation.image[0].url}
                    alt={conversation.name}
                    className="w-[100px] h-[100px] rounded-xl ml-[10px]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSideBar;
