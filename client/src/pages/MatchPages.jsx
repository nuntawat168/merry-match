import React from "react";
import DiscoverSideBar from "../components/DiscoverSideBar";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";
import Chat from "./Chat";
import { MatchProvider, useMatch } from "../contexts/matchContext";
import { useSocket } from "../contexts/socketContext";

const MatchPages = () => {
  function RenderContent() {
    const { contentToRender } = useMatch();
    const { room } = useSocket();
    if (contentToRender === "Matching") {
      // return <MatchCard />;
    } else if (contentToRender.includes("Chat")) {
      return <Chat room={room} />;
    }
  }

  return (
    <section className="w-full flex flex-col justify-center">
      <Navbar />
      <div className="flex justify-center h-screen mt-[-90px]">
        <div className=" w-[1440px] flex flex-row bg-[#ffff]">
          <MatchProvider>
            <DiscoverSideBar />
            <RenderContent />
          </MatchProvider>
        </div>
      </div>
    </section>
  );
};

export default MatchPages;
