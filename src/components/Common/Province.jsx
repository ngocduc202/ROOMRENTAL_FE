import React from 'react'
import { location } from '../../ultils/constant'
import ProvinceButon from './ProvinceButon'

const Province = () => {
  return (
    <div className='flex items-center gap-5 justify-center py-5'>
      {location?.map(item => (
        <ProvinceButon
          key={item?.id}
          image={item?.image}
          name={item?.name}
        />
      ))}
    </div>
  )
}

export default Province