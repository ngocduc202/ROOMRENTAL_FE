import React, { memo } from 'react'
import icons from '../../ultils/icons'
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
import * as actions from '../../store/action'
import { useDispatch } from 'react-redux'


const { GrNext } = icons
const ItemSidebar = ({ title, content, IsDouble, type }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const formatContent = () => {
    const oddEl = content?.filter((item, index) => {
      return index % 2 !== 0
    })
    const evenEl = content?.filter((item, index) => {
      return index % 2 === 0
    })
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((el, i) => i === index)
      }
    })

    return formatContent
  }

  const handleFilterPosts = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    })
  }

  return (
    <div className='p-4 rounded-md bg-white w-full'>
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      {!IsDouble && <div className='flex flex-col gap-2'>
        {content?.length > 0 && content?.map((item, index) => (
          <Link to={`${formatVietnameseToString(item?.value)}`} key={index} className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
            <GrNext size={10} color='gray' />
            <p>{item?.value}</p>
          </Link>
        ))}
      </div>}
      {IsDouble && <div className='flex flex-col gap-2'>
        {content?.length > 0 && formatContent(content)?.map((item, index) => (
          <div key={index} className=''>
            <div className='flex items-center justify-around'>
              <div
                onClick={() => handleFilterPosts(item?.left?.code)}
                className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                <GrNext size={10} color='gray' />
                <p className='text-sm'>{item?.left.value}</p>
              </div>
              <div
                onClick={() => handleFilterPosts(item?.right?.code)}
                className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'>
                <GrNext size={10} color='gray' />
                <p className='text-sm'>{item?.right.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default memo(ItemSidebar)