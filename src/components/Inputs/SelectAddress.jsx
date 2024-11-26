import React, { memo } from 'react'

const SelectAddress = ({ label, options, value, setValue, type, reset }) => {
  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
      <label className='font-medium' htmlFor="selectAddress">{label}</label>
      <select
        value={reset ? '' : value}
        onChange={(e) => setValue(e.target.value)}
        id="selectAddress"
        className='outline-none border border-gray-300 p-2 rounded-md w-full'
      >
        <option value="">{`--Chọn ${label} --`}</option>
        {options?.map(item => (
          <option
            value={type === 'province' ? item?.province_id : item?.district_id}
            key={type === 'province' ? item?.province_id : item?.district_id}>
            {type === 'province' ? item?.province_name : item?.district_name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default memo(SelectAddress)