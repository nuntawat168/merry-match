import React from 'react';
import discoverIcon from '../assets/icon/discover.svg';


const DiscoverSideBar = () => {
    return (
        <div className='h-[100vh] bg-[#ffff] w-[21.94vw] flex flex-col justify-between'>
            <button className='flex flex-col justify-center items-center w-[19.58vw] p-2 border-[2px] rounded-xl border-purple-500 m-[20px] hover:bg-purple-200'>
                <img className='w-[66.33px] mt-[30px]' src={discoverIcon} alt="Discover Icon" />
                <p className='text-[24px] font-bold text-red600'>Discover New Match</p>
                <p className='text-[14px] mb-[30px] text-gray-600 text-center'>Start find and Merry to get know and connect with new friend!</p>
            </button>
            <div>
                <p className='text-left ml-[20px] font-bold text-[24px]'>
                    Merry Match!
                </p>
            </div>
            <div>
                <p className='text-left ml-[20px] font-bold text-[24px]'>
                    Chat with Merry Match
                </p>
            </div>
        </div>
    )
}

export default DiscoverSideBar;