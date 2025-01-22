import React from 'react'
import { text } from '../../ultils/dataContact'
import Button from '../Common/Button'

const Contact = () => {
  return (
    <div className=' bg-white rounded-md shadow-md p-4 w-[70%] flex flex-col justify-center items-center gap-6'>
      <img src={text.image} alt="" className='w-full h-48 object-contain' />
      <p >{text.content}</p>
      <div className='flex items-center justify-around w-full'>
        {text.contacts.map((item, index) => (
          <div key={index} className='flex flex-col items-center justify-center'>
            <span className='text-orange-500 font-semibold'>{item.text}</span>
            <span className='text-blue-900 text-[24px] font-semibold'>{item.phone}</span>
            <span className='text-blue-900 text-[24px] font-semibold'>{item.zalo}</span>
          </div>
        ))}
      </div>
      <Button
        text='Gửi liên hệ'
        bgColor='bg-blue-500'
        textColor='text-white'
        px='px-6'
      />
    </div>
  )
}

export default Contact