import React from 'react'
import { Address, Overview } from '../../components'
import { BsCameraFill } from 'react-icons/bs'
const CreatePost = () => {

  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
      <div className='flex gap-4 '>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address />
          <Overview />
          <div className='w-full'>
            <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn </small>
            <div className='w-full'>
              <label htmlFor="file" className='w-full gap-3 flex flex-col items-center my-4 justify-center border-gray-400 border-2 h-[200px] border-dashed rounded-md'>
                <BsCameraFill size={60} /> Thêm ảnh</label>
              <input hidden type="file" id="file" />
            </div>
          </div>
        </div>
        <div className='w-[30%] flex-none'>
          map
        </div>
      </div>
    </div>
  )
}

export default CreatePost