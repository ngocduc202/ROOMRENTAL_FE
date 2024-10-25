import {SItem} from '../index';

const RelatedPost = () => {
    return (
        <div className='w-full bg-white rounded-md p-4'>
           <h3 className='font-semibold text-lg mb-4'>Tin mới đăng </h3>
            <div className='w-full flex flex-col gap-2'>
                <SItem title='Chi phí cho thuê phòng trọ tại Tp.HCM ' price='15.000.000' createdAt='2 tháng trước'/>
                <SItem />
                <SItem />
            </div>
        </div>
    )
}

export default RelatedPost