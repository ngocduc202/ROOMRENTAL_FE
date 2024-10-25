
import { text } from '../../ultils/constant'
import {Province, ItemSidebar, RelatedPost} from '../../components'
import List from './List'
import Pagination from './Pagination'
import {useSelector} from 'react-redux';


const HomePage = () => {

  const { categories, prices, areas } = useSelector((state) => state.app)



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
          <List />
          <Pagination />
        </div>
        <div className='w-[30%] flex flex-col gap-4 justify-start items-center'>
          <ItemSidebar content={categories} title="Danh sách cho thuê" />
          <ItemSidebar content={prices} type="priceCode" title="Xem theo giá" IsDouble={true} />
          <ItemSidebar content={areas} type="areaCode" title="Xem theo diện tích " IsDouble={true} />
          <RelatedPost />
        </div>
      </div>
    </div>
  )
}

export default HomePage