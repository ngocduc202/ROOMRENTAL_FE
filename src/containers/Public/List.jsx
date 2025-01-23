import React, { useEffect, useState } from 'react'
import { Button, Item } from '../../components'

import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/action'
import { useSearchParams } from 'react-router-dom'

const List = ({ categoryCode }) => {
  const dispatch = useDispatch()
  const [sort, setSort] = useState(0)
  const [searchParams] = useSearchParams()
  const { posts } = useSelector(state => state.post)
  useEffect(() => {
    let params = []
    for (let entry of searchParams.entries()) {
      params.push(entry)
    }
    let searchParamsObject = {}
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
      }
    })
    if (categoryCode) searchParamsObject.categoryCode = categoryCode
    if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
    dispatch(getPostsLimit(searchParamsObject))
  }, [searchParams, categoryCode, sort])

  return (
    <div className='w-full p-2 bg-white shadow-md rounded-md px-4'>
      <div className='flex items-center justify-between my-3'>
        <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
        <span>Cập nhật : 12:02 06/06/2024</span>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <span>Sắp xếp :</span>
        <span onClick={() => setSort(0)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'underline'}`}>Mặc định</span>
        <span onClick={() => setSort(1)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'underline'}`}>Mới nhất</span>
      </div>
      <div className='items'>
        {posts?.length > 0 && posts?.map(
          (items) =>
            <Item key={items?.id}
              address={items?.address}
              images={JSON.parse(items?.images?.image)}
              title={items?.title}
              user={items?.user}
              description={JSON.parse(items?.description)}
              attributes={items?.attributes}
              star={+items?.star}
              id={items?.id}
            />
        )
        }
      </div>
    </div>
  )
}

export default List