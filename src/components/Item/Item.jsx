import React, { memo, useState } from 'react'
import icons from '../../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'

const { GrStar, RiHeartFill, RiHeartLine, BsBookmarkStarFill } = icons
const indexs = [0, 1, 2, 3,]

const Item = ({ images, user, title, star, description, attributes, address, id }) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false)
  const handleStar = (star) => {
    let stars = []
    for (let i = 0; i <= +star; i++) {
      stars.push(<GrStar key={i} className='star-item' size={18} color='yellow' />)
    }
    return stars
  }

  return (
    <div className='w-full flex border-t border-orange-600 py-3'>
      <Link to={`chi-tiet/${formatVietnameseToString(title)}/${id}`} className='w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer'>
        {images?.length > 0 && images?.filter((i, index) => indexs?.some(i => i === index))?.map((i, index) => (
          <img key={index} src={i} alt="" className='w-[47%] h-[117px] object-cover' />
        ))}
        <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-1'>{`${images?.length} ảnh`}</span>
        <span
          className='text-white absolute right-4 bottom-1'
          onMouseEnter={() => setIsHoverHeart(true)}
          onMouseLeave={() => setIsHoverHeart(false)}
        >
          {isHoverHeart ? <RiHeartFill size={26} color='red' /> : <RiHeartLine size={26} />}
        </span>
      </Link>
      <div className='w-3/5'>
        <div className='flex justify-between gap-2 w-full'>
          <div className=' text-red-600 font-medium'>
            {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => (
              <span key={number}>{star}</span>
            ))}
            {title}
          </div>
          <div className='w-[10%] flex justify-end'><BsBookmarkStarFill size={24} color='orange' /></div>
        </div>
        <div className='my-2 flex items-center justify-between gap-2'>
          <span className='font-bold text-green-600 flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{attributes?.price}</span>
          <span className='flex-1'>{attributes?.acreage}</span>
          <span className='flex-3 whitespace-nowrap overflow-hidden text-ellipsis'>{`${address?.split(',')[address?.split(',').length - 2]}${address?.split(',')[address?.split(',').length - 1]}`}</span>
        </div>
        <p className='text-gray-500 w-full h-[50px] w text-ellipsis overflow-hidden'>
          {description}
        </p>
        <div className='flex items-center my-5 justify-between w-full'>
          <div className='flex items-center w-[40%] gap-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s" alt="avatar" className='w-[30px] h-[30px] rounded-full object-cover' />
            <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{user?.name}</p>
          </div>
          <div className='flex items-center gap-1 w-[60%]'>
            <button
              className='bg-blue-700 text-white p-1 rounded-md text-[15px] font-medium h-[35px]'
              type='button'>
              {`Gọi ${user?.phone}`}
            </button>
            <button
              className='text-blue-700 p-1 rounded-md border border-blue-700 text-[15px] h-[35px]'
              type='button'>
              Nhắn ZALO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Item)