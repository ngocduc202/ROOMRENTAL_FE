import React, { useCallback } from 'react'
import logo from '../../assets/logo.png'
import { Button } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, Link } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/action'

const { AiOutlinePlusCircle } = icons

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])
  return (
    <div className='w-1100'>
      <div className='w-full flex items-center justify-between'>
        <Link to={'/'}><img src={logo} alt="logo" className='w-[240px] h-[70px] object-contain' /></Link>
        <div className='flex gap-1 items-center'>
          {!isLoggedIn &&
            <div className='flex gap-1 items-center'>
              <small>Phongtro123 xin chào !</small>
              <Button text='Đăng nhập' textColor='text-white' bgColor='bg-[#3961fb]' onClick={() => goLogin(false)} />
              <Button text='Đăng ký' textColor='text-white' bgColor='bg-[#3961fb]' onClick={() => goLogin(true)} />
            </div>
          }
          {isLoggedIn &&
            <div className='flex gap-1 items-center'>
              <small>Ten</small>
              <Button text='Đăng xuất' textColor='text-white' bgColor='bg-red-700' onClick={() => dispatch(actions.logout())} />
            </div>
          }
          <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' icAfter={<AiOutlinePlusCircle />} />
        </div>
      </div>
    </div>
  )
}

export default Header