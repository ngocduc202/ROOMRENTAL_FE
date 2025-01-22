import React, { memo } from 'react'
import anonAvatar from '../../assets/anon-avatar.png'
import icons from '../../ultils/icons'
import { blobToBase64 } from '../../ultils/Common/tobase64'

const { BsDot, BsTelephoneFill, SiZalo } = icons
const BoxInfo = ({ userData }) => {
  return (
    <div className='w-full bg-white rounded-md flex flex-col items-center p-4 gap-2'>
      <img src={(userData?.avatar && blobToBase64(userData?.avatar)) || anonAvatar} alt="avatar" className='w-[90px] h-[90px] object-contain rounded-full' />
      <h3 className='text-lg font-medium'>{userData?.name}</h3>
      <span className='flex items-center'>
        <BsDot color='green' size={24} />
        <span className='text-sm font-light'>Đang hoạt động</span>
      </span>
      <span className='text-sm font-normal'>Tham gia từ: {userData?.createdAt?.split("T")[0]}</span>
      <a href="#"
        className='bg-[#35aa7d] text-white font-bold text-lg py-2 flex items-center justify-center gap-2 w-full rounded-md '>
        <BsTelephoneFill />{userData?.phone}</a>
      <a href={`https://zalo.me/${userData?.zalo}`}
        className='bg-blue-500 font-bold text-white py-1 flex items-center justify-center gap-2 w-full rounded-md '>
        <SiZalo color='white' size={35} />Nhắn zalo</a>
    </div>
  )
}

export default memo(BoxInfo)