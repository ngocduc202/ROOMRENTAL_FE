import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import Header from './Header'
import SidebarAdmin from './SidebarAdmin'


const System = () => {

  const { isLoggedIn } = useSelector(state => state.auth)

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div className='w-full h-screen flex flex-col items-center'>
      <Header />
      <div className='flex w-full flex-auto'>
        <SidebarAdmin />
        <div className='flex-auto bg-white shadow-md h-full p-4'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default System