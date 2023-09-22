import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import '@react-spring/web';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { FaMapMarkerAlt } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";

const MatchPopup = ({ userData, onClose }) => {
    console.log(userData);
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-6 border border-gray-300 w-[720px] h-[720px] rounded-[50px]">
            <div className="text-center mt-[48%]">
                <h2 className="text-[46px] font-bold mb-4 text-red-400">Merry Match!</h2>
                <p className='text-white'>Name: {userData.name}</p>
                <p className='text-white'>Sex: {userData.sex}</p>
                <p className='text-white'>Email: {userData.email}</p>
            </div>
            <div className='relative bottom-[60%] left-[95%]'>
                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" onClick={onClose}>x</button>
            </div>
        </div>
    );
};

const MatchCard = () => {
    const [originalUsers, setOriginalUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(60);
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


    const fetchData = async () => {
        setIsSearching(true);
        try {
            // const user_id = '60';
            const token = localStorage.getItem("token");
            const user = jwtDecode(token);
            console.log(user.id);
            const apiUrl = `http://localhost:4000/user/unmatchlist/${user.id}`;
            const queryParams = new URLSearchParams();

            if (minAge) {
                queryParams.append('minAge', minAge);
            }
            if (maxAge) {
                queryParams.append('maxAge', maxAge);
            }

            if (isMaleSelected) {
                queryParams.append('sex', 'male');
            }
            if (isFemaleSelected) {
                queryParams.append('sex', 'female');
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
                console.error('API response data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
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
        if (touchEndX < touchStartX && currentImageIndex < selectedUser.image.length - 1) {
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


    const handleHeartClick = async (user_response, index) => {
        try {
            if (cardRefs.current[index]) {
                cardRefs.current[index].swipe("right");
                const response = await axios.post(`http://localhost:4000/user/like/${user_response}`);
                console.log(response.data.message);

                checkPopup(user_response);
            }
        } catch (error) {
            console.error('Error liking user:', error);
        }
    };

    const checkPopup = async (user_response) => {
        try {
            const response = await axios.post(`http://localhost:4000/user/ismatch/${user_response}`);
            console.log(response.data.message);

            if (response.data.message === "User is matched") {
                const matchUserDataResponse = await axios.get(`http://localhost:4000/user/${user_response}`);
                const userData = matchUserDataResponse.data.data;
                setMatchUserData(userData);
                setmatchPopupOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const closeMatchPopup = () => {
        setmatchPopupOpen(false);
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
    }, [minAge, maxAge, isMaleSelected, isFemaleSelected, isDefaultSelected, isSearching]);

    const filterUsers = (user) => {
        if (
            (isMaleSelected && user.sex === 'male') ||
            (isFemaleSelected && user.sex === 'female') ||
            (isDefaultSelected && !isMaleSelected && !isFemaleSelected)
        ) {
            return user.age >= minAge && user.age <= maxAge;
        }
        return false;
    };
    console.log(filteredUsers)

    return (
        <div className='w-full bg-[#160404] h-[936px] relative'>
            <div className='flex justify-center mt-[12vh] mr-[200px] z-10'>
                {filteredUsers.map((user, index) => (
                    <TinderCard
                        className='absolute'
                        key={`${user.name}_${index}`}
                        ref={(ref) => (cardRefs.current[index] = ref)}
                        preventSwipe={["up", "down"]}
                    >
                        <div className='relative w-[620px] p-[20px] max-w-[85vw] h-[620px] rounded-4xl bg-cover bg-center'>
                            <button
                                onClick={() => openPopup(user)}>
                                <p className='font-semibold text-[32px] text-[#ffff] mt-[530px] flex-1 absolute'>{user.name}</p>
                                <img src={user.image[0].url} alt={user.name} className='w-[85vw] h-[620px] rounded-3xl' />
                            </button>

                            <div className='flex flex-row absolute top-[550px] left-[220px]'>
                                <button
                                    className='mr-[20px] w-[80px] h-[80px] bg-white rounded-3xl'
                                    onClick={() => handleCrossClick(user.user_id, index)}
                                >
                                    <div className='flex flex-row justify-center text-4xl text-gray-600'>
                                        <ImCross />
                                    </div>
                                </button>
                                <button
                                    className='w-[80px] h-[80px] bg-white rounded-3xl'
                                    onClick={() => handleHeartClick(user.user_id, index)}
                                >
                                    <div className='flex flex-row justify-center text-4xl text-red-500'>
                                        <AiFillHeart />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </TinderCard>
                ))}
            </div>

            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-xl flex flex-row">
                        {selectedUser && (
                            <>
                                <div
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}>
                                    <img className='w-[478px] h-[478px] mr-[20px] rounded-3xl'
                                        src={selectedUser.image[currentImageIndex].url}
                                        alt={selectedUser.name} />
                                </div>
                                <div className="flex justify-between items-center p-4">
                                    <button onClick={handlePrevClick} disabled={currentImageIndex === 0} className="text-2xl relative left-[-500px] text-gray-600"><div>
                                        <SlArrowLeft />
                                    </div>
                                    </button>
                                    <button onClick={handleNextClick} disabled={currentImageIndex === selectedUser.image.length - 1} className="text-2xl relative left-[-95px] text-gray-600">
                                        <div>
                                            <SlArrowRight />
                                        </div>
                                    </button>
                                </div>


                                <div className='mt-[10px]'>
                                    <span className="text-[58px] font-bold mr-2">{selectedUser.name}</span>
                                    <span className='text-[58px] font-bold text-gray-700'>{selectedUser.age}</span>
                                    <div className='text-[24px] text-gray-700 flex flex-row'>
                                        <div className='mt-1 text-red-200'><FaMapMarkerAlt /></div>
                                        <span className='mr-2'>
                                            {selectedUser.city}
                                        </span>
                                        <span>
                                            {selectedUser.location}
                                        </span>
                                    </div>
                                    <div className='flex flex-row mt-[45px]'>
                                        <div className='mr-[40px]'>
                                            <p className='mb-[20px] text-[16px] text-gray-900'>Sexual identities</p>
                                            <p className='mb-[20px] text-[16px] text-gray-900'>Sexual preferences</p>
                                            <p className='mb-[20px] text-[16px] text-gray-900'>Racial preferences</p>
                                            <p className='mb-[20px] text-[16px] text-gray-900'>Meeting interests</p>
                                        </div>
                                        <div>
                                            <p className='mb-[20px] text-[16px] text-gray-700 font-semibold'>Male</p>
                                            <p className='mb-[20px] text-[16px] text-gray-700 font-semibold'>{selectedUser.sexual_preferences}</p>
                                            <p className='mb-[20px] text-[16px] text-gray-700 font-semibold'>{selectedUser.racial_preferences}</p>
                                            <p className='mb-[40px] text-[16px] text-gray-700 font-semibold'>{selectedUser.meeting_interests}</p>
                                        </div>
                                    </div>
                                    <p className='text-[24px] font-bold'>About Me</p>
                                    <p>{selectedUser.about_me}</p>
                                    <p className='text-[24px] font-bold'>Hobbies and Interests</p>
                                    <p></p>
                                </div>
                            </>
                        )}
                        <button className='relative top-[-250px] left-4' onClick={closePopup}><p className='text-[20px] font-bold text-gray-500'>x</p></button>
                    </div>
                </div>
            )}

            <div>
                <button onClick={() => checkPopup(user.user_id)}>Like</button>
                {matchPopupOpen && <MatchPopup userData={matchUserData} onClose={closeMatchPopup} />}
            </div>



            <section className="bg-white shadow pl-[13px] pr-[16px] h-[936px] w-[220px] absolute top-0 right-0">
                <h2 className="text-xl font-semibold mt-[60px]">Filter Profiles</h2>
                <div className='mt-[40px]'>
                    <p>Sex you're interested</p>
                </div>
                <article className='flex flex-col'>
                    <div className='flex flex-row mt-[30px]'>
                        <input
                            type="checkbox"
                            className='text-[#000000] text-[24px] mr-[12px]'
                            checked={isMaleSelected}
                            onChange={() => {
                                setIsMaleSelected(!isMaleSelected);
                                setIsFemaleSelected(false);
                                setIsDefaultSelected(false);
                            }}
                        />
                        <p>Male</p>
                    </div>
                    <div className='flex flex-row mt-[12px]'>
                        <input
                            type="checkbox"
                            className='text-[#000000] text-[24px] mr-[12px]'
                            checked={isFemaleSelected}
                            onChange={() => {
                                setIsFemaleSelected(!isFemaleSelected);
                                setIsMaleSelected(false);
                                setIsDefaultSelected(false);
                            }}
                        />
                        <p>Female</p>
                    </div>
                    <div className='flex flex-row mt-[12px]'>
                        <input
                            type="checkbox"
                            className='text-[#000000] text-[24px] mr-[12px]'
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

                <article className='mt-[50px] text-center'>
                    <label htmlFor="minAgeRange">Age Range</label>
                    <input
                        type="range"
                        id="minAgeRange"
                        name="minAgeRange"
                        min="18"
                        max={maxAge}
                        step="1"
                        value={minAge}
                        onChange={handleMinAgeChange}
                        className='w-[188px]'
                    />
                    <p>Min Age: {minAge}</p>

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
                        className='w-[188px]'
                    />
                    <p>Max Age: {maxAge}</p>
                </article>

                <div className='mt-[120px] flex justify-center'>
                    <button className='text-white px-4 py-2 rounded bg-red-400' onClick={handleSearchClick}>
                        Search
                    </button>
                </div>
            </section>
        </div>



    );

}

export default MatchCard;










