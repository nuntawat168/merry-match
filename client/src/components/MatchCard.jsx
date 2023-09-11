import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import '@react-spring/web';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';

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

    const fetchData = async () => {
        setIsSearching(true);
        try {
            const user_id = '7';
            const apiUrl = `http://localhost:4000/user/unmatchlist/${user_id}`;
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


    const handleHeartClick = async (user_response, index) => {
        try {
            const user_interest = displayedUser.user_id;

            if (cardRefs.current[index]) {
                cardRefs.current[index].swipe("right");
            }

            const response = await axios.post(`http://localhost:4000/user/match/${user_interest}/${user_response}`);

            console.log("Match Result:", response.data);
        } catch (error) {
            console.error("Error matching:", error);
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

    const handleSearchClick = async () => {
        fetchData();
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

    return (
        <div className='w-[1088.97px] bg-[#160404] h-[936px]'>
            <div className='flex justify-center mt-[12vh] mr-[200px] z-10'>
                {filteredUsers.map((user, index) => (
                    <TinderCard
                        className='absolute'
                        key={`${user.name}_${index}`}
                        ref={(ref) => (cardRefs.current[index] = ref)}
                        preventSwipe={["up", "down"]}
                    >
                        <div className='relative w-[620px] p-[20px] max-w-[85vw] h-[620px] rounded-4xl bg-cover bg-center'>
                            <Link to={`/profile/${user.user_id}`}>
                                <p className='font-semibold text-[32px] text-[#ffff] mt-[530px] flex-1 absolute'>{user.name}</p>
                                <img src={user.image} alt={user.name} className='w-full h-full rounded-3xl' />
                            </Link>

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

            <section className="bg-white p-4 shadow absolute top-[88px] right-[143.5px] h-[936px] w-[220px]">
                <h2 className="text-xl font-semibold mb-2">Filter Profiles</h2>
                <div className='mt-[40px]'>
                    <p>Gender you are interested in</p>
                </div>
                <article className='flex flex-col'>
                    <div className='flex flex-row mt-[12px]'>
                        <input
                            type="checkbox"
                            className='text-[#000000] text-[24px]'
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
                            className='text-[#000000] text-[24px]'
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
                            className='text-[#000000] text-[24px]'
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

                <div className='mt-[20px]'>
                    <button className='text-white px-4 py-2 rounded bg-red-400' onClick={handleSearchClick}>
                        Search
                    </button>
                </div>
            </section>
        </div>
    );

}

export default MatchCard;










