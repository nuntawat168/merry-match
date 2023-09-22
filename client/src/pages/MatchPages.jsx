import React from 'react'
import DiscoverSideBar from '../components/DiscoverSideBar'
import MatchCard from '../components/MatchCard'
import Navbar from '../components/Navbar'

const MatchPages = () => {
  return (
    <section className='w-full flex flex-col justify-center'>
      <Navbar />
      <div className='flex justify-center h-screen mt-[-90px]'>
        <div className=' w-[1440px] flex flex-row bg-[#ffff]'>
          <DiscoverSideBar />
          <MatchCard />
        </div>
      </div>
    </section>
  )
}

export default MatchPages