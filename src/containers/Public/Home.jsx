import React, {useEffect} from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Search from './Search'
import { Contact, Intro } from '../../components'
import * as actions from '../../store/action';
import {useDispatch} from 'react-redux';

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getPrices())
        dispatch(actions.getAreas())
        dispatch(actions.getProvinces())
    }, [])
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