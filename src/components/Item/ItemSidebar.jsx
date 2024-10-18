import React, { memo } from 'react'
import icons from '../../ultils/icons'


const { GrNext } = icons
const ItemSidebar = ({ title, content }) => {

  return (
    <div className='p-4 rounded-md bg-white w-full'>
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      <div className='flex flex-col gap-2'>
        {content?.length > 0 && content?.map((item, index) => (
          <div key={index} className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='gray' />
            <p>{item?.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(ItemSidebar)