import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import locationIcon from "../assets/icon/location.svg";
import chatIcon from "../assets/icon/chat.svg";
import viewIcon from "../assets/icon/Frame.svg";
import merrySelected from "../assets/icon/merrySelected.png";
import MerryMatchStatus from "../assets/icon/match.svg";
import NotMatchStatus from "../assets/icon/not match.png";
import UnmatchConfirmationDialog from "../components/Modal/UnmatchConfirmDialog";
import { fetchMatchListData } from "../contexts/fetchMerryListData";
import useTextConvert from "../hooks/useTextConvert";

import { useDisclosure } from "@chakra-ui/react";

function MerryListPage() {
  const { calculateAge, capitalize } = useTextConvert();

  const matchLists = fetchMatchListData();
  console.log("test ของพี่อิ่ม: ", matchLists);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUnmatchConfirm = () => {
    // ใส่ด้วยยยย !!!!
  };

  const renderedMatch = matchLists.map((user) => {
    return (
      <div
        key={user.user_response}
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
            <div className="w-[48px] h-[48px] bg-white shadow-nav flex justify-center items-center rounded-2xl ml-[16px] hover:cursor-pointer">
              <img
                src={viewIcon}
                alt="view icon"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div
              className="w-[48px] h-[48px] bg-red-500 flex justify-center items-center rounded-2xl ml-[16px] hover:cursor-pointer"
              onClick={onOpen}
            >
              <img src={merrySelected} alt="merry icon" />
              <UnmatchConfirmationDialog
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={handleUnmatchConfirm}
              />
            </div>
          </div>
        </section>
      </div>
    );
  });

  return (
    <>
      <Navbar />
      <main className="w-full bg-main flex justify-center font-nunito">
        <section className="w-[1440px] bg-main flex justify-center">
          <div className="w-[930px] mb-[171px] mt-[80px]">
            <section className="bg-main flex justify-between items-end mb-[80px]">
              <div className="text-purple-500 text-[46px] font-extrabold">
                <p className="text-[14px] text-beige-700 font-medium">
                  MERRY LIST
                </p>
                <h1>Let’s know each other</h1>
                <h1>with Merry!</h1>
              </div>
              <div className="px-[24px]">
                <div className="text-[16px] flex">
                  <p className="text-gray-700 mr-[10px]">Merry limit today</p>
                  <p className="text-red-400">2/20</p>
                </div>
                <p className="text-end text-gray-600 text-[12px]">
                  Reset in 12h...
                </p>
              </div>
            </section>
            <section>{renderedMatch}</section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MerryListPage;
