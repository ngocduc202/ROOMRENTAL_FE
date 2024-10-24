import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Search from './Search'
import { Contact, Intro } from '../../components'

const Home = () => {
  return (
    <div className='w-full flex flex-col gap-6 items-center h-full'>
      <Header />
      <Navigation />
      <Search />
      <div className='lg:w-3/5 w-4/5 flex flex-col items-start justify-start mt-3'>
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <div className='h-[500px]'></div>
    </div>
  )
}

export default Home