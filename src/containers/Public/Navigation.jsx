import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/action'


const Navigation = () => {

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.app)
  useEffect(() => {
    dispatch(actions.getCategories())
  }, [dispatch])


  return (
    <div className='w-full flex justify-center items-center h-[40px] bg-secondary1 text-white'>
      <div className='w-3/5 flex h-full items-center text-sm font-medium'>
        <NavLink
          to={`/`}
          className={({ isActive }) => isActive ? 'hover:bg-secondary2 bg-secondary2 h-full flex items-center px-4' : 'hover:bg-secondary2 h-full flex items-center px-4'}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 && categories.map((item) => {
          return (
            <div key={item?.code} className='h-full flex justify-center items-center'>
              <NavLink
                to={`${formatVietnameseToString(item?.value)}`}
                className={({ isActive }) => isActive ? 'hover:bg-secondary2 bg-secondary2 h-full flex items-center px-4' : 'hover:bg-secondary2 h-full flex items-center px-4'}
              >
                {item.value}
              </NavLink>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Navigation