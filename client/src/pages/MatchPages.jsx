import React from 'react'
import DiscoverSideBar from '../components/discoverSideBar'
import MatchCard from '../components/MatchCard'

const MatchPages = () => {
    return (
        <article className='w-[1440px] m-0'>
            {/* navbar */}
            <div className='flex flex-row h-full w-[100vw] bg-[#ffff]'>
                <DiscoverSideBar />
                <MatchCard />

            </div>
        </article>
    )
}

export default MatchPages