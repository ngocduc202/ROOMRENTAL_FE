import {SItem} from '../index';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import * as actions from '../../store/action'

const RelatedPost = () => {

    const dispatch = useDispatch()
    const {newPosts} = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, []);

    return (
        <div className='w-full bg-white rounded-md p-4'>
           <h3 className='font-semibold text-lg mb-4'>Tin mới đăng </h3>
            <div className='w-full flex flex-col gap-2'>
                {newPosts?.map((item, index) =>
                    <SItem
                        key={index}
                        title={item.title}
                        price={item?.attributes?.price}
                        image={JSON.parse(item.images.image)}
                        createdAt={item.createdAt}
                    />
                )}
            </div>
        </div>
    )
}

export default RelatedPost