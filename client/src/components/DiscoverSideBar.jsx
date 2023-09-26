import React from 'react';
import discoverIcon from '../assets/icon/discover.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import merryHeart from "../assets/icon/merry.png";
import { useLocation, useNavigate } from 'react-router-dom';

const DiscoverSideBar = () => {
    const [matchList, setMatchList] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (matchList.length > 0) {
            setDisplayedUsers(matchList.slice(currentIndex, currentIndex + 2));
        }
    }, [matchList, currentIndex]);

    const handleNextClick = () => {
        if (currentIndex + 2 < matchList.length) {
            setCurrentIndex(currentIndex + 2);
        }
    };

    const handlePrevClick = () => {
        if (currentIndex >= 2) {
            setCurrentIndex(currentIndex - 2);
        }
    };

    const fetchMatchList = async (user_id) => {
        try {
            const token = localStorage.getItem('token');
            const user = jwtDecode(token);
            const response = await axios.get(`http://localhost:4000/user/matchlist/${user_id}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const user = jwtDecode(token);
            const data = await fetchMatchList(user.id);
            setMatchList(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const mockChat = [
        {name: "Alex Clerk", img:"", msg: "New Message from Alex"},
        {name: "Leon Diolopez", img:"", msg: "New Message from Leon"},
        {name: "Laila Emmagowitz", img:"", msg: "New Message from Laila"},
    ]

    const renderedChat = mockChat.map(chat => {
        return (
            <div key={chat.name} className='flex py-[16px] px-[12px] hover:cursor-pointer'>
                <img src={chat.img} alt={`Profile photo of ${chat.name.split(' ')[0]}`} className='bg w-[60px] h-[60px] rounded-full mr-[12px]' />
                <div className='flex flex-col justify-center'>
                    <p className='text-[16px] text-gray-900'>{chat.name.split(' ')[0]}</p>
                    <p className='text-[14px] text-gray-700'>{chat.msg}</p>
                </div>
            </div>
        )
    })

    return (
        <div className={location.pathname === "/match" ? 'pt-[90px] bg-white w-[316px] flex flex-col' : 'bg-white w-[316px] flex flex-col'}>
            <section 
                className='bg-gray-100 flex flex-col justify-center items-center w-[282px] h-[187px] p-[24px] border-[1px] rounded-[16px] border-purple-500 my-[36px] mr-[15px] ml-[17px] hover:cursor-pointer'
                onClick={() => navigate('/match')}
            >
                <img className='w-[66.33px] mt-[30px]' src={discoverIcon} alt="Discover Icon" />
                <p className='text-[24px] font-bold text-red-600'>Discover New Match</p>
                <p className='text-[14px] mb-[30px] text-gray-700 text-center'>Start find and Merry to get know and connect with new friend!</p>
            </section>
            <section>
                <p className='text-left py-[24px] ml-[16px] mr-[19px] font-bold text-[24px] text-gray-900'>
                    Merry Match!
                </p>
                <div className="flex flex-wrap ml-[16px] hover:cursor-pointer">
                    {displayedUsers.map((user) => (
                        <div key={user.id} className='w-[100px] h-[100px] rounded-3xl mr-[12px] relative'
                            style={{
                                backgroundImage: `url(${user.image[0].url})`,
                                backgroundSize: 'cover', 
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            <img src={merryHeart} alt="heart" className='z-2 absolute right-0 bottom-0 w-[20px] h-[20px]' />
                            <img src={merryHeart} alt="heart" className='z-1 absolute right-[10px] bottom-0 w-[20px] h-[20px]' />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mr-[19px] ml-[16px] pt-[16px]">
                    <button onClick={handlePrevClick} disabled={currentIndex === 0} className="text-xl">Previous</button>
                    <button onClick={handleNextClick} disabled={currentIndex + 2 >= matchList.length} className="text-xl">Next</button>
                </div>
            </section>
            <section className='px-[16px]'>
                <p className='text-left font-bold text-[24px] text-gray-900 mb-[16px] mt-[18px]'>
                    Chat with Merry Match
                </p>
                <div>{renderedChat}</div>
            </section>
        </div>
    )
}

export default DiscoverSideBar;