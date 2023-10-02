import { useSocket } from "../contexts/socketContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NotificationBadge from "./NotificationBadge";

function Notification() {
  const {
    notifications,
    setNotifications,
    setRoom,
    setContentToRender,
    setMessages,
  } = useSocket();
  const navigate = useNavigate();

  const location = useLocation();

  async function gotoChat(conversation) {
    console.log("conversation:", conversation);
    setRoom({ ...conversation });
    setContentToRender(`Chat-${conversation.conversation_id}`);
    console.log("location", location.pathname);
    if (location.pathname !== "/match") {
      navigate("/match");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/fetchMessages/${
        conversation.conversation_id
      }`
    );

    setMessages(response.data.data);
    // setNotifications(notifications.shift());
  }

  const renderedNoti = notifications.map((noti, index) => {
    console.log(noti);
    if (noti.type === "newMessage") {
      return (
        <button
          key={index}
          className="flex justify-between py-[12px] px-[14px] text-start hover:text-purple-500 hover:font-extrabold"
          onClick={() => {
            gotoChat(noti.content.conversation);
            setNotifications(notifications.toSpliced(index, 1));
          }}
        >
          <img
            className="w-[32px] h-[32px] bg rounded-full"
            src={noti.content.conversation.receiver_image[0].url}
            alt=""
          />
          <p className="w-[179px] ">
            '{noti.content.conversation.receiver_name}' send new message to you
          </p>
        </button>
      );
    }

    // return (
    //   <div key={index} className="flex justify-between py-[12px] px-[14px]">
    //     <div className="w-[32px] h-[32px] bg rounded-full"></div>
    //     <p className="w-[179px]">
    //       '{noti.username}' {noti.content}
    //     </p>
    //   </div>
    // );
  });

  return (
    <div className="z-20 absolute top-[60px] right-[0px] font-nunito text-[14px] text-gray-700 font-normal shadow-userDropdown bg-white rounded-2xl w-[251px] flex flex-col justify-center">
      {notifications.length === 0 && (
        <div className="flex justify-between py-[12px] px-[14px]">
          <p className="w-[179px]">No new notification for you</p>
        </div>
      )}
      {renderedNoti}
    </div>
  );
}

export default Notification;
