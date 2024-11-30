import React from 'react'
import Select from './Inputs/Select'
import { useSelector } from 'react-redux'
import InputReadOnly from './Inputs/InputReadOnly'
import InputFormV2 from './Inputs/InputFormV2'

const targets = [
  { code: 'Nam', value: 'Nam' },
  { code: 'Nữ', value: 'Nữ' },
]

const Overview = ({ payload, setPayload }) => {

  const { categories } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  return (
    <div>
      <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-1/2'><Select value={payload?.categoryCode} setValue={setPayload} name='categoryCode' options={categories} label="Loại/Chuyên mục" /></div>
        <InputFormV2 value={payload?.title} name='title' setValue={setPayload} label="Tiêu đề" />
        <div className='flex flex-col gap-2'>
          <label htmlFor="description">Nội dung mô tả</label>
          <textarea
            id="description"
            cols={30}
            rows={10}
            className='w-full rounded-md border outline-none border-gray-300 p-2'
            value={payload.description}
            onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
          ></textarea>
        </div>
        <div className='w-1/2 flex flex-col gap-4'>
          <InputReadOnly label="Thông tin liên hệ" value={currentData?.name || currentData?.username} />
          <InputReadOnly label="Điện thoại" value={currentData?.phone} />
          <InputFormV2
            small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
            label="Giá cho thuê"
            unit='đồng'
            name='priceNumber'
            value={payload.priceNumber}
            setValue={setPayload}
          />
          <InputFormV2 label="Diện tích" unit='m2' value={payload.areaNumber}
            setValue={setPayload} name='areaNumber' />
          <Select value={payload.target} setValue={setPayload} name='target' label='Đối tượng cho thuê' options={targets} />
        </div>
      </div>
    </div>
  )
}

export default Overview