import React from 'react'
import { Button, InputForm } from '../../components'
const Login = () => {
  return (
    <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
      <h3 className='font-semibold text-2xl mb-3'>Đăng nhập</h3>
      <div className='w-full flex flex-col gap-5'>
        <InputForm label='SỐ ĐIỆN THOẠI' />
        <InputForm label='MẬT KHẨU' />
        <Button
          text='Đăng nhập'
          bgColor='bg-secondary1'
          textColor='text-white'
          fullWith
        />
      </div>
      <div className='mt-7 flex items-center justify-between'>
        <span className='text-blue-700 hover:text-red-500 cursor-pointer text-sm'>Bạn quên mật khẩu ?</span>
        <span className='text-blue-700 hover:text-red-500 cursor-pointer text-sm'>Tạo tài khoản mới</span>
      </div>

    </div>
  )
}

export default Login