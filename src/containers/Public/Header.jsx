import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { Button, User } from '../../components'
import icons from '../../ultils/icons'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { path } from '../../ultils/constant'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/action'
import menuManage from '../../ultils/menuManage'

const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const headerRef = useRef()
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [searchParams] = useSearchParams()
  const { isLoggedIn } = useSelector(state => state.auth)
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } })
  }, [])

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [searchParams.get('page')])


  return (
    <div ref={headerRef} className='w-3/5'>
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
            <div className='flex gap-3 items-center relative'>
              <User />
              <Button
                text='Quản lý tài khoản'
                textColor='text-white'
                bgColor='bg-blue-700'
                px='px-4'
                icAfter={<BsChevronDown />}
                onClick={() => setIsShowMenu(prev => !prev)} />
              {isShowMenu && <div className='absolute top-full bg-white shadow-md rounded-md p-4 right-0 min-w-200 flex flex-col'>
                {menuManage.map((item, index) => (
                  <Link to={item?.path} key={index}
                    className='hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2 flex items-center gap-2'>
                    {item?.icon}
                    {item.text}
                  </Link>
                ))}
                <span onClick={() => {
                  dispatch(actions.logout())
                  setIsShowMenu(false)
                }}
                  className='cursor-pointer hover:text-orange-500 text-blue-600 py-2 flex items-center gap-2'>
                  <AiOutlineLogout /> Đăng xuất</span>
              </div>}
            </div>
          }
          <Button text='Đăng tin mới' textColor='text-white' bgColor='bg-secondary2' icAfter={<AiOutlinePlusCircle />} />
        </div>
      </div>
    </div>
  )
}

export default Header