import React from 'react'
import { SearchItem } from '../../components'
import icons from '../../ultils/icons'

const { BsChevronRight, GoLocation, TbReportMoney, RiCrop2Line, BiBuildingHouse, FiSearch } = icons
const Search = () => {
  return (
    <div className='p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
      <SearchItem text="Phòng trọ , nhà trọ" iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} iconBefore={<BiBuildingHouse color='rgb(156, 163, 175)' />} fontWeight />
      <SearchItem text="Toàn quốc" iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} iconBefore={<GoLocation color='rgb(156, 163, 175)' />} />
      <SearchItem text="Chọn giá" iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} iconBefore={<TbReportMoney color='rgb(156, 163, 175)' />} />
      <SearchItem text="Chọn diện tích" iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />} iconBefore={<RiCrop2Line color='rgb(156, 163, 175)' />} />
      <button
        type='button'
        className='outline-none py-2 px-4 w-full bg-secondary1 text-[12.3px] flex items-center justify-center gap-2 text-white font-medium'
      >
        <FiSearch />
        Tìm kiếm
      </button>
    </div>
  )
}

export default Search