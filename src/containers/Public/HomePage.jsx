import React from 'react'
import { text } from '../../ultils/constant'
import { Province } from '../../components'
import List from './List'
import Pagination from './Pagination'
import { useSearchParams } from 'react-router-dom'


const HomePage = () => {

  const [params] = useSearchParams()


  return (
    <div className='w-full flex flex-col gap-3'>
      <div>
        <h1 className='text-3xl font-bold'>
          {text.HOME_TITLE}
        </h1>
        <p className='text-base text-gray-700 pt-2'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='w-full flex gap-4'>
        <div className='w-[70%]'>
          <List page={params.get('page')} />
          <Pagination page={params.get('page')} />
          <div className='h-[500px]'>

          </div>
        </div>
        <div className='w-[30%]'>
          Sidebar
        </div>
      </div>
    </div>
  )
}

export default HomePage