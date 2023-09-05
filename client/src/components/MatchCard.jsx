import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import '@react-spring/web';
import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";
import { ImCross } from "react-icons/im";



const MatchCard = () => {
    const [originalUsers, setOriginalUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        ageRange: { min: '', max: '' },
        interests: [],
        keywords: '',
    });
    const [displayedUser, setDisplayedUser] = useState(null);
    const [isMaleSelected, setIsMaleSelected] = useState(false);
    const [isFemaleSelected, setIsFemaleSelected] = useState(false);
    const [isDefaultSelected, setIsDefaultSelected] = useState(true);



    const cardRefs = useRef([]);

    useEffect(() => {
        fetchData();
    }, [filters]);

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, filteredUsers.length);
    }, [filteredUsers]);

    const fetchData = async () => {
        try {
            const apiUrl = 'http://localhost:4000/user';
            const queryParams = new URLSearchParams(filters);
            const response = await axios.get(`${apiUrl}?${queryParams}`);

            if (Array.isArray(response.data.data)) {
                setOriginalUsers(response.data.data);
                setFilteredUsers(response.data.data);
            } else {
                console.error('API response data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const filterMaleUsers = () => {
        const maleUsers = originalUsers.filter((user) => user.sex === 'Male');
        setFilteredUsers(maleUsers);

        setIsMaleSelected(true);
        setIsFemaleSelected(false);
        setIsDefaultSelected(false);

    };

    const filterFemaleUsers = () => {
        const femaleUsers = originalUsers.filter((user) => user.sex === 'Female');
        setFilteredUsers(femaleUsers);

        setIsMaleSelected(false);
        setIsFemaleSelected(true);
        setIsDefaultSelected(false);

    };

    const filterDefaultUsers = () => {
        setFilteredUsers(originalUsers);

        setIsMaleSelected(false);
        setIsFemaleSelected(false);
        setIsDefaultSelected(true);

    };

    const handleLeftSwipe = () => {
        const cardRef = cardRefs.current[0];
        if (cardRef) {
            cardRef.swipe('left').then(() => {
                // หลังจาก swipe ให้ลบ user แรกออกจาก originalUsers
                const updatedUsers = [...originalUsers];
                updatedUsers.shift(); // ลบ user แรกออก
                setOriginalUsers(updatedUsers);
                // และกำหนดผู้ใช้ถัดไปใน displayedUser
                if (updatedUsers.length > 0) {
                    setDisplayedUser(updatedUsers[0]);
                } else {
                    setDisplayedUser(null); // ถ้าไม่มี user อยู่แล้ว
                }
            });
        }
    };



    const handleRightSwipe = () => {
        const cardRef = cardRefs.current[0];
        if (cardRef) {
            cardRef.swipe('right').then(() => {

                const updatedUsers = [...originalUsers];
                updatedUsers.shift();
                setOriginalUsers(updatedUsers);

                if (updatedUsers.length > 0) {
                    setDisplayedUser(updatedUsers[0]);
                } else {
                    setDisplayedUser(null);
                }
            });
        }
    };




    return (
        <div className='w-[1088.97px] bg-[#160404]'>
            <div className='flex justify-center mt-[12vh] mr-[200px] z-10'>
                {filteredUsers.map((user, index) => (

                    <TinderCard
                        className='absolute'
                        key={user.name}
                        ref={(ref) => (cardRefs.current[index] = ref)}
                        preventSwipe={["up", "down"]}
                    >
                        <div className='relative w-[620px] p-[20px] max-w-[85vw] h-[620px] rounded-4xl bg-cover bg-center'>
                            <p className='font-semibold text-[32px] text-[#ffff] mt-[530px] flex-1 absolute'>{user.name}</p>
                            <img src={user.image} alt={user.name} className='w-full h-full rounded-3xl' />
                        </div>
                    </TinderCard>
                ))}
            </div>

            <div className='absolute top-[650px] left-[700px]'>
                <button className='mr-[20px] w-[80px] h-[80px] bg-white rounded-3xl' onClick={handleLeftSwipe}>
                    <div className='flex flex-row justify-center text-4xl text-gray-600'>
                        <ImCross />
                    </div>

                </button>
                <button className='w-[80px] h-[80px] bg-white rounded-3xl' onClick={handleRightSwipe}>
                    <div className='flex flex-row justify-center text-4xl text-red-500'>
                        <AiFillHeart />
                    </div>
                </button>
            </div>
            <div>
                <div className="bg-white p-4 shadow fixed top-0 right-0 h-full w-[220px]">
                    <h2 className="text-xl font-semibold mb-2">Filter Profiles</h2>
                    <div>
                        <p>Gender you interest</p>
                    </div>
                    <div className='flex flex-col'>
                        <button className={`mt-[20px] w-[188px] h-[48px] bg-red-400 text-white rounded-3xl ${isMaleSelected ? 'bg-blue-500' : ''}`} onClick={filterMaleUsers}>
                            {isMaleSelected ? <AiFillHeart /> : 'Male'}
                        </button>

                        <button className={`mt-[20px] w-[188px] h-[48px] bg-red-400 text-white rounded-3xl ${isFemaleSelected ? 'bg-blue-500' : ''}`} onClick={filterFemaleUsers}>
                            {isFemaleSelected ? <AiFillHeart /> : 'Female'}
                        </button>

                        <button className={`mt-[20px] w-[188px] h-[48px] bg-red-400 text-white rounded-3xl ${isDefaultSelected ? 'bg-blue-500' : ''}`} onClick={filterDefaultUsers}>
                            {isDefaultSelected ? <AiFillHeart /> : 'Default'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchCard;







