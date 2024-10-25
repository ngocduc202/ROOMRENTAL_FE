 const SItem = ({title, price,image , createdAt}) => {
    return (
        <div className='w-full flex items-center gap-2 border-b border-gray-300 py-2'>
            <img
                className='w-[65px] h-[65px] object-cover rounded-md'
                src=""
                alt="anh"
            />
            <div className='w-full flex flex-col justify-between gap-1'>
                <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0,25)}...`}</h4>
                <div className='flex items-center justify-between w-full'>
                    <span className='font-medium text-green-500 text-sm'>{price}</span>
                    <span className='text-gray-300 text-sm'>{createdAt}</span>
                </div>
            </div>
        </div>
    )
}

export default SItem