import React, { memo } from 'react'

const SearchItem = ({ iconBefore, iconAfter, text, fontWeight }) => {
  return (
    <div className='bg-white p-2 px-4 w-full rounded-md text-gray-400 text-[12.3px] flex items-center justify-between'>
      <div className='flex items-center gap-1 w-full'>
        {iconBefore && iconBefore}
        <span className={`${fontWeight && 'font-medium text-black'} w-full overflow-hidden text-ellipsis whitespace-nowrap`}> {text}</span>
      </div>
      {iconAfter && iconAfter}
        <div className={"w-f"}></div>
    </div>
  )
}

export default memo(SearchItem)