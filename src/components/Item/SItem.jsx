import moment from 'moment';
import 'moment/locale/vi'
import { GrStar } from 'react-icons/gr';

const SItem = ({ title, price, image, createdAt, star }) => {

    const formatTime = (createdAt) => {
        return moment(createdAt).fromNow()
    }

    const handleStar = (star) => {
        let stars = []
        for (let i = 0; i <= +star; i++) {
            stars.push(<GrStar key={i} className='star-item' size={18} color='yellow' />)
        }
        return stars
    }

    return (
        <div className='w-full flex items-center gap-2 border-b border-gray-300 py-2'>
            <img
                className='w-[65px] h-[65px] object-cover rounded-md flex-none'
                src={image[0]}
                alt="anh"
            />
            <div className='w-full flex-auto flex flex-col justify-between gap-1'>
                <h4 className='text-blue-600 text-[14px]'>
                    {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => (
                        <span key={number}>{star}</span>
                    ))}
                    {`${title?.slice(0, 25)}...`}
                </h4>
                <div className='flex items-center justify-between w-full'>
                    <span className='font-medium text-green-500 text-xs'>{price}</span>
                    <span className='text-gray-400 text-xs'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default SItem