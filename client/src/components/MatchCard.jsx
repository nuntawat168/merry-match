import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '@react-spring/web';
import axios from 'axios';


const MatchCard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/user');

            if (Array.isArray(response.data.data)) {
                setUsers(response.data.data);
            } else {
                console.error('API response data is not an array:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className='w-[62.84vw] bg-utilityBg'>
            <div className='flex justify-center mt-[12vh]'>
                {users.map((user) => (
                    <TinderCard
                        className='absolute'
                        key={user.name}
                        preventSwipe={["up", "down"]}
                    >
                        <div className='relative w-[620px] p-[20px] max-w-[85vw] h-[620px] rounded-4xl bg-cover bg-center'>
                            <p className='font-semibold text-[32px] text-[#ffff] mt-[530px] flex-1 absolute'>{user.name}</p>
                            <img src={user.image} alt={user.name} className='w-full h-full' />

                        </div>
                    </TinderCard>
                ))}

            </div>
            <div>
                <button></button>
                <button></button>
            </div>
        </div>
    )
}

export default MatchCard;



