import React, {useState} from 'react'
import {Modal, SearchItem} from '../../components'
import icons from '../../ultils/icons'
import {useSelector} from 'react-redux';

const { BsChevronRight, GoLocation, TbReportMoney, RiCrop2Line, BiBuildingHouse, FiSearch } = icons
const Search = () => {

    const [isShowModal , setIsShowModal ] = useState(false);
    const [content, setContent] = useState([]);
    const {provinces , areas , prices ,categories} = useSelector(state => state.app)
    const [name, setName] = useState('');
    const handleShowModal = (content ,name) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
    };
    return (
      <>
          <div
              className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
              <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(categories , 'category')}>
                       <SearchItem text="Phòng trọ , nhà trọ" iconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>}
                                   iconBefore={<BiBuildingHouse color='rgb(156, 163, 175)'/>} fontWeight/>
              </span>
              <span className='flex-1 cursor-pointer'  onClick={() => handleShowModal(provinces , 'province')}>
                   <SearchItem text="Toàn quốc" iconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>}
                               iconBefore={<GoLocation color='rgb(156, 163, 175)'/>}/>
              </span>
              <span className='flex-1 cursor-pointer'  onClick={() => handleShowModal(prices , 'price')}>
                  <SearchItem text="Chọn giá" iconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>}
                              iconBefore={<TbReportMoney color='rgb(156, 163, 175)'/>}/>
              </span>
              <span className='flex-1 cursor-pointer'  onClick={() => handleShowModal(areas , 'area')}>
                  <SearchItem text="Chọn diện tích" iconAfter={<BsChevronRight color='rgb(156, 163, 175)'/>}
                              iconBefore={<RiCrop2Line color='rgb(156, 163, 175)'/>}/>
              </span>
              <button
                  type='button'
                  className='outline-none py-2 px-4 flex-1 w-full bg-secondary1 text-[12.3px] flex items-center justify-center gap-2 text-white font-medium'
              >
                  <FiSearch/>
                  Tìm kiếm
              </button>
          </div>
          {isShowModal && <Modal content={content} name={name} setIsShowModal={setIsShowModal}/>}
      </>
  )
}

export default Search