import React, { useState } from 'react'
import { Button, InputForm } from '../../components'
import Swal from 'sweetalert2'

const Contact = () => {

  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    content: ''
  })

  const handleSubmit = () => {
    Swal.fire(`Cảm ơn ${payload.name ? payload.name : 'bạn'}`, 'Phản hồi của bạn đã được ghi nhận', 'success')
  }

  return (
    <div className='w-full'>
      <h1 className='text-2xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
      <div className='flex gap-4 '>
        <div className='flex-1 flex flex-col gap-4 h-fit rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-400'>
          <h4 className='font-medium'>Thông tin liên hệ</h4>
          <span>Chúng tôi biết bạn có rất nhiều sư lựa chọn. Nhưng cảm ơn vì đã lựa chọn PhongTro123.com</span>
          <span>Điện thoại: 0123 456 789</span>
          <span>Email: cskh.phongtro123@gmail.com</span>
          <span>Zalo: 0123 456 789</span>
          <span>Viber: 0123 456 789</span>
          <span>Địa chỉ : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt molestiae nobis voluptatibus enim officiis voluptates nihil similique vitae reprehenderit ut</span>
        </div>
        <div className='flex-1 bg-white shadow-md rounded-md p-4 mb-6'>
          <h4 className='font-medium text-lg mb-4'>Liên hệ trực tuyến</h4>
          <div className='flex flex-col gap-6'>
            <InputForm
              label='HỌ VÀ TÊN'
              value={payload.name}
              setValue={setPayload}
              keyPayload='name'
            />
            <InputForm
              label='SỐ ĐIỆN THOẠI'
              value={payload.phone}
              setValue={setPayload}
              keyPayload='phone'
            />
            <div>
              <label htmlFor="description">Nội dung mô tả</label>
              <textarea
                id="description"
                cols={30}
                rows={3}
                className='outline-none bg-[#e8f0fe] p-2 rounded-md w-full'
                value={payload.content}
                onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                name='content'
              >
              </textarea>
            </div>
            <Button
              text='Gửi liên hệ'
              bgColor='bg-blue-500'
              textColor='text-white'
              fullWith
              onClick={handleSubmit}
            />

          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact