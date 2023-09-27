import React from "react";
import DiscoverSideBar from "../components/discoverSideBar";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";
import Chat from "./Chat";
import { MatchProvider, useMatch } from "../contexts/matchContext";
import { useSocket } from "../contexts/socketContext";
// import { SocketProvider } from "./contexts/socketContext";
import { SocketProvider } from "../contexts/socketContext";

const MatchPages = () => {
  function RenderContent() {
    const { contentToRender } = useMatch();
    const { room } = useSocket();
    if (contentToRender === "Matching") {
      return <MatchCard />;
    } else if (contentToRender.includes("Chat")) {
      return <Chat room={room} />;
    }
  }

  return (
    <article className="w-[1440px] m-0">
      <Navbar />
      <div className="flex flex-row h-full w-[100vw] bg-[#ffff]">
        <SocketProvider>
          <MatchProvider>
            <DiscoverSideBar />
            <RenderContent />
          </MatchProvider>
        </SocketProvider>
      </div>
    </article>
  );
};

export default MatchPages;
