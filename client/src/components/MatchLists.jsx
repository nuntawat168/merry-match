import React, { useState } from "react";
import { useMatchLists } from "../contexts/matchListsContext";
import UnmatchButton from "../components/UnmatchButton";
import ViewProfileButton from "../components/ViewProfileButton";
import useTextConvert from "../hooks/useTextConvert";
import locationIcon from "../assets/icon/location.svg";
import chatIcon from "../assets/icon/chat.svg";
import MerryMatchStatus from "../assets/icon/match.svg";
import NotMatchStatus from "../assets/icon/not match.png";

function MatchLists() {
  const { matchLists } = useMatchLists();
  const { calculateAge, capitalize } = useTextConvert();
  
  const renderedMatch = matchLists.map((user, index) => {
    return (
      <div
        key={index}
        className="flex justify-evenly border-solid border-b-[1px] border-gray-300 mb-[24px] pb-[40px] pt-[16px]"
      >
        <section className="flex w-[674px]">
          <img
            src={user.image[0].url}
            alt="user's profile pic"
            className="mr-[40px] w-[187px] h-[187px] bg rounded-3xl"
            style={{ objectFit: "cover" }}
          />
          <div>
            <section className="flex justify-start pb-[24px]">
              <div className="flex mr-[16px]">
                <p className="text-gray-900 text-[24px] font-bold mr-[10px]">
                  {user.name}
                </p>
                <p className="text-gray-700 text-[24px] font-bold">
                  {calculateAge(user.date_of_birth) || "N/A"}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={locationIcon}
                  alt="location icon"
                  className="w-[16px] mr-[6px]"
                />
                <p className="text-gray-700 text-[16px]">
                  {user.location}, {user.city}
                </p>
              </div>
            </section>
            <section className="text-[16px] flex">
              <div className="text-gray-900 w-[167px]">
                <p className="pb-[10px]">Sexual identities</p>
                <p className="pb-[10px]">Sexual preferences</p>
                <p className="pb-[10px]">Racial preferences</p>
                <p className="pb-[10px]">Meeting interests</p>
              </div>
              <div className="text-gray-600">
                <p className="pb-[10px]">{capitalize(user.sex) || "N/A"}</p>
                <p className="pb-[10px]">
                  {capitalize(user.sexual_preferences) || "N/A"}
                </p>
                <p className="pb-[10px]">
                  {capitalize(user.racial_preferences) || "N/A"}
                </p>
                <p className="pb-[10px]">
                  {capitalize(user.meeting_interests) || "N/A"}
                </p>
              </div>
            </section>
          </div>
        </section>
        <section className="flex flex-col items-end">
          {user.match_status === "match" ? (
            <img src={MerryMatchStatus} alt="Match" className="mb-[24px]" />
          ) : (
            <img src={NotMatchStatus} alt="Not Match" className="mb-[24px]" />
          )}
          <div className="flex justify-end w-[176px]">
            <div
              className={`w-[48px] h-[48px] bg-white shadow-nav flex justify-center items-center rounded-2xl hover:cursor-pointer ${
                user.match_status === "match" ? "" : "hidden"
              }`}
            >
              <img
                src={chatIcon}
                alt="message icon"
                className="w-[24px] h-[24px]"
              />
            </div>
            <ViewProfileButton user={user} />
            <UnmatchButton user_response_id={user.user_response} />
          </div>
        </section>
      </div>
    );
  });

  return renderedMatch;
}

export default MatchLists;
