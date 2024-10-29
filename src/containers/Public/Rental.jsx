import React, {useEffect, useState} from 'react'
import {ItemSidebar, Province, RelatedPost} from '../../components';
import List from './List';
import Pagination from './Pagination';
import { useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {formatVietnameseToString} from '../../ultils/Common/formatVietnameseToString';


const Rental = () => {

  const { prices, areas , categories } = useSelector((state) => state.app)
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const [categoryCode, setCategoryCode] = useState('');
  const location = useLocation()

  useEffect(() => {
    const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
    setCategoryCurrent(category)
    if(category){
      setCategoryCode(category.code)
    }
  }, [location , categories]);

  return (
      <div className='w-full flex flex-col gap-3'>
        <div>
          <h1 className='text-3xl font-bold'>
            {categoryCurrent?.header}
          </h1>
          <p className='text-base text-gray-700 pt-2'>{categoryCurrent?.subheader}</p>
        </div>
        <Province/>
        <div className='w-full flex gap-4'>
          <div className='w-[70%]'>
            <List categoryCode={categoryCode}/>
            <Pagination/>
          </div>
          <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
            <ItemSidebar content={prices} type="priceCode" title="Xem theo giá" IsDouble={true}/>
            <ItemSidebar content={areas} type="areaCode" title="Xem theo diện tích " IsDouble={true}/>
            <RelatedPost/>
          </div>
        </div>
      </div>
  )
}

export default Rental