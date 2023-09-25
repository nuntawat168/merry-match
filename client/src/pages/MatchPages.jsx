import React from 'react'
import DiscoverSideBar from '../components/discoverSideBar'
import MatchCard from '../components/MatchCard'
import Navbar from '../components/Navbar'

const MatchPages = () => {
    return (
        <section className='w-full flex flex-col justify-center'>
            <Navbar />
            <div className='z-[-10] flex justify-center'>
                <div className=' w-[1440px] flex flex-row h-full bg-[#ffff]'>
                    <DiscoverSideBar />
                    <MatchCard />
                </div>
            </div>
        </section>
    )
}

export default MatchPages