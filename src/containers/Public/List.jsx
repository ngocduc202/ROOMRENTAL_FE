import React, { useEffect } from 'react'
import { Button, Item } from '../../components'

import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/action'
import { useSearchParams } from 'react-router-dom'

const List = () => {

  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { posts } = useSelector(state => state.post)
  useEffect(() => {
    let params = []
    for (let entry of searchParams.entries()) {
      params.push(entry)
    }
    let searchParamsObject = {}
    params?.map(i => {
      searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] }
    })
    dispatch(getPostsLimit(searchParamsObject))

  }, [searchParams])

  return (
    <div className='w-full p-2 bg-white shadow-md rounded-md px-4'>
      <div className='flex items-center justify-between my-3'>
        <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
        <span>Cập nhật : 12:02 06/06/2024</span>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <span>Sắp xếp :</span>
        <Button text="Mặc định" bgColor='bg-gray-200' />
        <Button text="Mới nhất" bgColor='bg-gray-200' />
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