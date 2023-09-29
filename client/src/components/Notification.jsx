function Notification() {
  const notifications = [
    {
      username: "Khal Drogo",
      content: "Just Merry you! Click here to see profile",
    },
    {
      username: "Daeny",
      content: "Merry you back! Let's start conversation now",
    },
    {
      username: "Ygritte",
      content: "Merry you back! Let's start conversation now",
    },
  ];

  const renderedNoti = notifications.map((noti, index) => {
    return (
      <div key={index} className="flex justify-between py-[12px] px-[14px]">
        <div className="w-[32px] h-[32px] bg rounded-full"></div>
        <p className="w-[179px]">
          '{noti.username}' {noti.content}
        </p>
      </div>
    );
  });

  return (
    <div className="z-20 absolute top-[60px] right-[0px] font-nunito text-[14px] text-gray-700 font-normal shadow-userDropdown bg-white rounded-2xl w-[251px] h-[214px] flex flex-col justify-center">
      {renderedNoti}
    </div>
  );
}

export default Notification;
