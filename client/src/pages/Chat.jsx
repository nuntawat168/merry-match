import DiscoverSideBar from '../components/discoverSideBar';
import Navbar from '../components/Navbar';
import sendIcon from "../assets/icon/send button.png";
import uploadPhotoIcon from "../assets/icon/upload image.png";
import merryHeart from "../assets/icon/merry.png";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Chat() {
    const mockData = { username: "Daeny" }
    const socket = io('http://localhost:4000');
    const { userId } = useParams();

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        socket.on('chat message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    const sendMessage = () => {
        socket.emit('chat message', inputMessage);
        setInputMessage('');
    };



    return (
        <main className='bg font-nunito w-full'>
            <Navbar />
            <div className='flex'>
                <DiscoverSideBar />
                <div className='text-white w-full relative'>
                    <section className='flex flex-col px-[60px]'>
                        {/* show matching matching msg */}
                        <div className='bg-purple-100 w-[749px] h-[90px] p-[24px] rounded-2xl flex justify-center text-red-700 text-[14px] font-semibold mt-[48px] absolute top-[50px] left-1/2 transform -translate-x-1/2'>
                            <div className='flex justify-end relative'>
                                <img src={merryHeart} alt="heart" className='z-10 absolute right-[20px] w-[35px] h-[35px]' />
                                <img src={merryHeart} alt="heart" className='z-30 w-[35px] h-[35px]' />
                            </div>
                            <div className='pl-[24px]'>
                                <p>Now you and {mockData.username} are Merry Match!</p>
                                <p>You can message something nice and make a good conversation. Happy Merry!</p>
                            </div>
                        </div>

                        {/* left side chat */}

                        <div className='mb-[48px] mt-[236px]'>
                            <div className='text-[16px] text-black flex items-center'>
                                <div className='w-[40px] h-[40px] rounded-full bg-red-500 mr-[12px]'></div>
                                <p className='py-[16px] px-[24px] bg-purple-200 rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[0px] border-[1px] border-gray-300 mb-[16px]'>Hi</p>
                            </div>
                            <div className='text-[16px] text-black flex items-center'>
                                <div className='w-[40px] h-[40px] rounded-full bg-red-500 mr-[12px]'></div>
                                <p className='py-[16px] px-[24px] bg-purple-200 rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[0px] border-[1px] border-gray-300 mb-[16px]'>Do you like ma dragons?</p>
                            </div>
                            <div className='text-[16px] text-black flex items-end'>
                                <div className='w-[40px] h-[40px] rounded-full bg-red-500 mr-[12px]'></div>
                                <div className='w-[240px] h-[240px] bg-red-200 rounded-2xl'></div>
                            </div>

                        </div>
                        {/* right side chat */}
                        <div className='text-[16px] text-white'>
                            <div className='flex flex-col items-end'>

                                {messages.map((message, index) => (
                                    <div className='w-auto py-[16px] px-[24px] bg-purple-600 rounded-tl-[24px] rounded-tr-[24px] 
                                rounded-br-[0px] rounded-bl-[24px] mb-[16px]' key={index}>{message}</div>))}
                            </div>
                        </div>
                    </section>

                    {/* text input field */}
                    <section className='bg border-t-[1px] border-gray-800 h-[100px] px-[60px] w-full flex justify-between items-center absolute bottom-0'>
                        <div className='flex items-center'>
                            <img src={uploadPhotoIcon} alt="upload photo icon" className='w-[48px] h-[48px]' />
                            <input
                                className='text-gray-500 text-[16px] pl-[24px]'
                                type='text'
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder='Message here...' />
                        </div>
                        <div>
                            <button onClick={sendMessage}>
                                <img src={sendIcon} alt="send icon" className='w-[48px] h-[48px]' />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Chat;