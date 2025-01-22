import { SItem } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/action'

const RelatedPost = ({ newPost }) => {

    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const { newPosts, outStandingPost } = useSelector((state) => state.post)

    useEffect(() => {
        newPost ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutStandingPost())
    }, []);

    useEffect(() => {
        newPost ? setPosts(newPosts) : setPosts(outStandingPost)
    }, [newPosts, outStandingPost])


    return (
        <div className='w-full bg-white rounded-md p-4'>
            <h3 className='font-semibold text-lg mb-4'>{newPost ? 'Tin mới đăng' : 'Tin nổi bật'} </h3>
            <div className='w-full flex flex-col gap-2'>
                {posts?.map((item, index) =>
                    <SItem
                        key={index}
                        title={item?.title}
                        price={item?.attributes?.price}
                        image={JSON.parse(item?.images?.image)}
                        createdAt={item?.createdAt}
                        star={item?.star}
                    />
                )}
            </div>
        </div>
    )
}

export default RelatedPost