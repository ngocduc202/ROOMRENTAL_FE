import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiGetCategories } from '../../services/category'
import { formatVietnameseToString } from '../../ultils/constant'

const Navigation = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories()
      if (response?.data?.err === 0) {
        console.log(response)
        setCategories(response?.data?.response)
      }
    }
    fetchCategories()
  }, [])


  return (
    <div className='w-screen flex justify-center items-center h-[40px] bg-secondary1 text-white'>
      <div className='w-1100 flex h-full items-center text-sm font-medium'>
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