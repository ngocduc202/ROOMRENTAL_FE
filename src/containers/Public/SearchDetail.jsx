import React, { useEffect, useState } from 'react'
import { ItemSidebar, RelatedPost } from '../../components';
import List from './List';
import Pagination from './Pagination';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';



const SearchDetail = () => {

  const { prices, areas } = useSelector((state) => state.app)
  const location = useLocation()


  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-3xl font-bold'>
          {location?.state?.titleSearch || 'Kết quả tìm kiếm'}
        </h1>
        <p className='text-base text-gray-700 pt-2'>{`${location?.state?.titleSearch || ''} ,phòng mới xây , chính chủ gần chợ ,trường học , siêu thị , cửa hàng tiện lợi , khu an ninh`}</p>
      </div>
      <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <List />
          <Pagination />
        </div>
        <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
          <ItemSidebar content={prices} type="priceCode" title="Xem theo giá" IsDouble={true} />
          <ItemSidebar content={areas} type="areaCode" title="Xem theo diện tích " IsDouble={true} />
          <RelatedPost />
        </div>
      </div>
    </div>
  )
}

export default SearchDetail