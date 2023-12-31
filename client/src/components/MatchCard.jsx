import React, { useState, useEffect, useRef } from "react";
import TinderCard from "react-tinder-card";
import "@react-spring/web";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import jwtDecode from "jwt-decode";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import viewIcon from "../assets/icon/view-icon.svg";
import leftArrow from "../assets/icon/left-arrow.svg";
import rightArrow from "../assets/icon/right-arrow.svg";
import merryMatch from "../assets/icon/merry-match-frame.png";
import { fetchMerryLimit } from "./FetchMerryLimit";
import useTextConvert from "../hooks/useTextConvert";
import { useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../contexts/socketContext";
import MatchCardViewProfileButton from "./MatchCardViewProfileButton";

const MatchCard = () => {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(80);
  const [isMaleSelected, setIsMaleSelected] = useState(false);
  const [isFemaleSelected, setIsFemaleSelected] = useState(false);
  const [isDefaultSelected, setIsDefaultSelected] = useState(true);
  const [displayedUser, setDisplayedUser] = useState(null);
  const cardRefs = useRef([]);
  const originalUsersRef = useRef([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [matchPopupOpen, setmatchPopupOpen] = useState(false);
  const [matchUserData, setMatchUserData] = useState(null);
  const [packageLimit, setPackageLimit] = useState("");
  const [merryLimit, setMerryLimit] = useState("");
  const { calculateAge } = useTextConvert();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { setRoom, setContentToRender, setMessages } = useSocket();
  const navigate = useNavigate();
  const [usersForLike, setUsersForLike] = useState([]);
  const [userginationIndex, setUserginationIndex] = useState(0);

  async function gotoChatByReceiverId(receiver_id) {
    const getConversation = await axios.get(
      `${
        import.meta.env.VITE_API_ENDPOINT
      }/user/conversationByReceiverId/${receiver_id}`
    );
    const conversation = getConversation.data.data;
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
  }

  // fetch merry limit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userPackageLimit, userMerryLimit } = await fetchMerryLimit();
        setPackageLimit(userPackageLimit);
        setMerryLimit(userMerryLimit);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();

    fetchMerryLimit()
      .then(({ userPackageLimit, userMerryLimit }) => {
        setPackageLimit(userPackageLimit);
        setMerryLimit(userMerryLimit);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [merryLimit]);

  const fetchData = async () => {
    setIsSearching(true);
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      console.log(user.id);
      const apiUrl = `${import.meta.env.VITE_API_ENDPOINT}/user/unmatchlist/${
        user.id
      }`;
      const queryParams = new URLSearchParams();

      if (minAge) {
        queryParams.append("minAge", minAge);
      }
      if (maxAge) {
        queryParams.append("maxAge", maxAge);
      }

      if (isMaleSelected) {
        queryParams.append("sex", "male");
      }
      if (isFemaleSelected) {
        queryParams.append("sex", "female");
      }

      const response = await axios.get(`${apiUrl}?${queryParams}`);

      if (Array.isArray(response.data.data)) {
        const filteredUsers = response.data.data;
        originalUsersRef.current = filteredUsers;
        setOriginalUsers(filteredUsers);

        if (isSearching) {
          setFilteredUsers(filteredUsers);
        }
      } else {
        console.error("API response data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchEndX < touchStartX &&
      currentImageIndex < selectedUser.image.length - 1
    ) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else if (touchEndX > touchStartX && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handlePrevClick = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentImageIndex < selectedUser.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const updateMerryLimit = async (newMerryLimit) => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      await axios.put(
        `${import.meta.env.VITE_API_ENDPOINT}/user-package/${user.id}`,
        {
          merry_limit: newMerryLimit - 1,
        }
      );
    } catch (error) {
      console.error("Error updating merry limit", error);
    }
  };

  const handleHeartClick = async (user_response, index) => {
    if (merryLimit > 0) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/user/ismatch/${user_response}`
        );
        const addResponse = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/user/like/${user_response}`
        );
        // console.log(typeof merryLimit);
        // setMerryLimit(await updateMerryLimit(merryLimit));
        // await updateMerryLimit(merryLimit);
        await updateMerryLimit(merryLimit);
        setMerryLimit(merryLimit - 1);

        if (response.data.message === "User is matched") {
          const matchUserDataResponse = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT}/user/${user_response}`
          );
          const userData = matchUserDataResponse.data.data;
          setMatchUserData(userData);
          setmatchPopupOpen(true);
          setTimeout(() => {
            setmatchPopupOpen(false); // Close the matchPopup after 5 sec
            cardRefs.current[index].swipe("right");
          }, 5000);
        } else {
          cardRefs.current[index].swipe("right");
        }
      } catch (error) {
        console.error("Error liking user:", error);
      }
    }
  };

  const handleCrossClick = (user_response, index) => {
    try {
      cardRefs.current[index].swipe("left");
    } catch (error) {
      console.error("Error swiping:", error);
    }
  };

  const handleMinAgeChange = (event) => {
    const newMinAge = parseInt(event.target.value, 10);
    setMinAge(newMinAge);
  };

  const handleMaxAgeChange = (event) => {
    const newMaxAge = parseInt(event.target.value, 10);
    setMaxAge(newMaxAge);
  };

  const handleClearClick = () => {
    setMinAge(18);
    setMaxAge(80);
    setIsMaleSelected(false);
    setIsFemaleSelected(false);
    setIsDefaultSelected(true);
    fetchData();
  };

  const handleSearchClick = async () => {
    fetchData();
  };

  const openPopup = (user) => {
    setIsPopupOpen(true);
    setSelectedUser(user);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchDataAndSetFilteredUsers = async () => {
      await fetchData();
      if (!isSearching) {
        setFilteredUsers(originalUsersRef.current);
        setDisplayedUser(originalUsersRef.current[0]);
      }
    };
    fetchDataAndSetFilteredUsers();
  }, []);

  useEffect(() => {
    if (isSearching) {
      const filteredUsers = originalUsersRef.current.filter(filterUsers);
      setFilteredUsers(filteredUsers);
    }
  }, [
    minAge,
    maxAge,
    isMaleSelected,
    isFemaleSelected,
    isDefaultSelected,
    isSearching,
  ]);

  const filterUsers = (user) => {
    if (
      (isMaleSelected && user.sex === "male") ||
      (isFemaleSelected && user.sex === "female") ||
      (isDefaultSelected && !isMaleSelected && !isFemaleSelected)
    ) {
      return (
        calculateAge(user.date_of_birth) >= minAge &&
        calculateAge(user.date_of_birth) <= maxAge
      );
    }
    return false;
  };
  // console.log(filteredUsers);

  function usergination() {
    // console.log(filteredUsers);
    setUsersForLike(
      [...filteredUsers]
        .slice(userginationIndex, userginationIndex + 1)
        .toReversed()
    );
    console.log(
      "user for like",
      [...filteredUsers]
        .slice(userginationIndex, userginationIndex + 1)
        .toReversed()
    );
  }

  useEffect(() => {
    usergination();
    // console.log("user for like:", usersForLike);
  }, [userginationIndex, filteredUsers]);

  const onSwipe = (direction) => {
    // console.log(`You swiped ${direction}`);
    // Handle the swipe event as needed
    setTimeout(() => {
      setUserginationIndex((prev) => prev + 1);
    }, 500);
  };

  const renderedCard = usersForLike.map((user, index) => (
    <TinderCard
      onSwipe={onSwipe}
      className="absolute"
      key={`${user.name}_${index}`}
      ref={(ref) => (cardRefs.current[index] = ref)}
      preventSwipe={["up", "down"]}
    >
      <div className="relative flex justify-center">
        <div
          className="h-[520px] w-[520px] 2xl:h-[620px] 2xl:w-[620px] rounded-[32px] absolute top-0 right-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7, 9, 65, 0.00) 61.94%, #390741 100%)",
          }}
        ></div>
        <img
          src={user.image[0].url}
          alt={user.name}
          className="h-[520px] w-[520px] 2xl:w-[620px] 2xl:h-[620px] rounded-[32px]"
          style={{ objectFit: "cover" }}
        />
        {!matchPopupOpen && (
          <>
            <div className="flex w-[520px] 2xl:w-[620px] pl-[40px] pr-[32px] justify-between absolute bottom-[50px]">
              <section className="flex items-center">
                <p className="font-semibold text-[32px] text-[#ffff] mr-[8px]">
                  {user.name.split(" ")[0]}
                </p>
                <p className="font-semibold text-[32px] text-gray-400 mr-[16px]">
                  {user.date_of_birth
                    ? calculateAge(user.date_of_birth)
                    : "N/A"}
                </p>
                {/* <div
                  className="w-[32px] h-[32px] rounded-full shadow-nav flex items-center justify-center"
                  style={{ background: "rgba(255, 255, 255, 0.20)" }}
                  onClick={() => openPopup(user)}
                >
                  <img
                    src={viewIcon}
                    alt="view profile"
                    className="w-[16px] h-[16px] hover:cursor-pointer"
                  />
                </div> */}
                <MatchCardViewProfileButton user={user} />
              </section>
              <section className="flex items-center">
                {/* <img
                  src={leftArrow}
                  alt="go left arrow"
                  className="hover:cursor-pointer"
                />
                <img
                  src={rightArrow}
                  alt="go right arrow"
                  className="hover:cursor-pointer"
                /> */}
              </section>
            </div>
            <div className="flex absolute bottom-[-35px]">
              <button
                className="mr-[24px] w-[80px] h-[80px] bg-white rounded-3xl flex justify-center items-center text-gray-600 text-3xl"
                onClick={() => handleCrossClick(user.user_id, index)}
              >
                <ImCross />
              </button>
              <button
                className="w-[80px] h-[80px] bg-white rounded-3xl flex justify-center items-center text-red-500 text-4xl"
                onClick={
                  merryLimit === 0
                    ? onOpen
                    : () => {
                        handleHeartClick(user.user_id, index);
                      }
                }
              >
                <AlertDialog
                  motionPreset="slideInBottom"
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                  isOpen={isOpen}
                  isCentered
                >
                  <AlertDialogOverlay
                    style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                  />

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      Your merry limit has been exceeded
                      <hr />
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                      Do you want to continue this Package?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <button
                        className="py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-100 text-red-600 shadow-btn"
                        ref={cancelRef}
                        onClick={() => navigate("/packages")}
                      >
                        Yes, I want to continue
                      </button>
                      <button
                        className=" ml-3 py-[12px] px-[24px] text-[16px] font-semibold rounded-[99px] bg-red-500 text-white shadow-login"
                        ref={cancelRef}
                        onClick={onClose}
                      >
                        No, I don’t want
                      </button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AiFillHeart />
              </button>
            </div>
          </>
        )}
        {matchPopupOpen && (
          <div className="z-10">
            <div className="flex flex-col h-[240px] justify-between items-center absolute top-[280px] right-[160px]">
              <img src={merryMatch} alt="merry match" />
              <button
                onClick={() => gotoChatByReceiverId(user.user_id)}
                className="px-[24px] py-[12px] bg-red-100 text-red-600 font-bold rounded-full"
              >
                Start Conversation
              </button>
              {/* เพิ่ม onclick ไปที่แชทของคนที่แมทช์ */}
            </div>
          </div>
        )}
      </div>
    </TinderCard>
  ));

  return (
    <div className="w-[1124px] bg-[#160404] relative overflow-hidden">
      <div className="flex justify-center mt-[20vh] z-10 w-[904px]">
        {renderedCard}
      </div>
      <div className="w-[215px] px-[20px] flex justify-between absolute top-[93vh] right-[562px]">
        <p className="text-gray-700 ">Merry limit today</p>
        <p className="text-red-400">{`${merryLimit}/${packageLimit}`}</p>
      </div>

      {/* เหลือทำ pop up เวลากดดูโปรไฟล์ */}
      {isPopupOpen && (
        <div className="z-10 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl flex flex-row">
            {selectedUser && (
              <>
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    className="w-[478px] h-[478px] mr-[20px] rounded-3xl"
                    src={selectedUser.image[currentImageIndex].url}
                    alt={selectedUser.name}
                  />
                </div>
                <div className="flex justify-between items-center p-4">
                  <button
                    onClick={handlePrevClick}
                    disabled={currentImageIndex === 0}
                    className="text-2xl relative left-[-500px] text-gray-600"
                  >
                    <div>
                      <SlArrowLeft />
                    </div>
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={
                      currentImageIndex === selectedUser.image.length - 1
                    }
                    className="text-2xl relative left-[-95px] text-gray-600"
                  >
                    <div>
                      <SlArrowRight />
                    </div>
                  </button>
                </div>

                <div className="mt-[10px]">
                  <span className="text-[58px] font-bold mr-2">
                    {selectedUser.name}
                  </span>
                  <span className="text-[58px] font-bold text-gray-700">
                    {selectedUser.age}
                  </span>
                  <div className="text-[24px] text-gray-700 flex flex-row">
                    <div className="mt-1 text-red-200">
                      <FaMapMarkerAlt />
                    </div>
                    <span className="mr-2">{selectedUser.city}</span>
                    <span>{selectedUser.location}</span>
                  </div>
                  <div className="flex flex-row mt-[45px]">
                    <div className="mr-[40px]">
                      <p className="mb-[20px] text-[16px] text-gray-900">
                        Sexual identities
                      </p>
                      <p className="mb-[20px] text-[16px] text-gray-900">
                        Sexual preferences
                      </p>
                      <p className="mb-[20px] text-[16px] text-gray-900">
                        Racial preferences
                      </p>
                      <p className="mb-[20px] text-[16px] text-gray-900">
                        Meeting interests
                      </p>
                    </div>
                    <div>
                      <p className="mb-[20px] text-[16px] text-gray-700 font-semibold">
                        Male
                      </p>
                      <p className="mb-[20px] text-[16px] text-gray-700 font-semibold">
                        {selectedUser.sexual_preferences}
                      </p>
                      <p className="mb-[20px] text-[16px] text-gray-700 font-semibold">
                        {selectedUser.racial_preferences}
                      </p>
                      <p className="mb-[40px] text-[16px] text-gray-700 font-semibold">
                        {selectedUser.meeting_interests}
                      </p>
                    </div>
                  </div>
                  <p className="text-[24px] font-bold">About Me</p>
                  <p>{selectedUser.about_me}</p>
                  <p className="text-[24px] font-bold">Hobbies and Interests</p>
                  <p></p>
                </div>
              </>
            )}
            <button
              className="relative top-[-250px] left-4"
              onClick={closePopup}
            >
              <p className="text-[20px] font-bold text-gray-500">x</p>
            </button>
          </div>
        </div>
      )}

      <section className="bg-white pl-[13px] pr-[16px] h-screen w-[220px] pt-[90px] absolute top-0 right-0 text-purple-800">
        <h2 className="text-[24px] font-bold mt-[60px]">Filter Profiles</h2>
        <p className="mt-[16px] text-[18px] font-semibold">Sex you interest</p>

        <article className="flex flex-col">
          <div className="flex flex-row mt-[16px]">
            <input
              type="checkbox"
              className="text-[#000000] text-[24px] mr-[12px]"
              checked={isMaleSelected}
              onChange={() => {
                setIsMaleSelected(!isMaleSelected);
                setIsFemaleSelected(false);
                setIsDefaultSelected(false);
              }}
            />
            <p>Male</p>
          </div>
          <div className="flex flex-row mt-[12px]">
            <input
              type="checkbox"
              className="text-[#000000] text-[24px] mr-[12px]"
              checked={isFemaleSelected}
              onChange={() => {
                setIsFemaleSelected(!isFemaleSelected);
                setIsMaleSelected(false);
                setIsDefaultSelected(false);
              }}
            />
            <p>Female</p>
          </div>
          <div className="flex flex-row mt-[12px]">
            <input
              type="checkbox"
              className="text-[#000000] text-[24px] mr-[12px]"
              checked={isDefaultSelected}
              onChange={() => {
                setIsDefaultSelected(!isDefaultSelected);
                setIsMaleSelected(false);
                setIsFemaleSelected(false);
              }}
            />
            <p>Default</p>
          </div>
        </article>

        <article className="mt-[50px]">
          <label htmlFor="minAgeRange" className="font-semibold text-[18px]">
            Age Range
          </label>
          <input
            type="range"
            id="minAgeRange"
            name="minAgeRange"
            min="18"
            max={maxAge}
            step="1"
            value={minAge}
            onChange={handleMinAgeChange}
            className="w-[188px]"
          />
          <p className="text-center">Min Age: {minAge}</p>

          <label htmlFor="maxAgeRange"></label>
          <input
            type="range"
            id="maxAgeRange"
            name="maxAgeRange"
            min={minAge}
            max="60"
            step="1"
            value={maxAge}
            onChange={handleMaxAgeChange}
            className="w-[188px]"
          />
          <p className="text-center">Max Age: {maxAge}</p>
        </article>

        <div className="mt-[140px] flex justify-center font-bold">
          <button
            className="text-red-500 px-[24px] py-[12px] rounded-full"
            onClick={handleClearClick}
          >
            Clear
          </button>
          <button
            className="text-white px-[24px] py-[12px] rounded-full bg-red-500"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </section>
    </div>
  );
};

export default MatchCard;
