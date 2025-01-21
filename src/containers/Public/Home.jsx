import React from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Search from './Search'
import { Contact, Intro } from '../../components'
import { useSelector } from 'react-redux';
import { path } from '../../ultils/constant'


const Home = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const location = useLocation()


  return (
    <div className='w-full flex flex-col gap-6 items-center h-full'>
      <Header />
      <Navigation />
      {isLoggedIn && location.pathname !== `/${path.CONTACT}` && !location.pathname?.includes(path.DETAIL) && <Search />}
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