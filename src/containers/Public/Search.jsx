import React, { useState } from 'react'
import { Modal, SearchItem } from '../../components'
import icons from '../../ultils/icons'
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/action'



const { BsChevronRight, GoLocation, TbReportMoney, RiCrop2Line, BiBuildingHouse, FiSearch } = icons
const Search = () => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const { provinces, areas, prices, categories } = useSelector(state => state.app)
    const [name, setName] = useState('');
    const [queries, setQueries] = useState({});
    const [arrMinMax, setArrMinMax] = useState({})
    const dispatch = useDispatch()


    const handleShowModal = (content, name) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
    };

    const handleSummit = (e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes("Code"))
        let queryCodesObj = {}
        queryCodes.forEach(item => {
            queryCodesObj[item[0]] = item[1]
        })

        dispatch(action.getPostsLimit(queryCodesObj))
    }

    return (
        <>
            <div
                className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(categories, 'category')}>
                    <SearchItem text={queries.category} defaultText={'Phòng trọ , nhà trọ'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<BiBuildingHouse color='rgb(156, 163, 175)' />} fontWeight />
                </span>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(provinces, 'province')}>
                    <SearchItem text={queries.province} defaultText={'Toàn quốc'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<GoLocation color='rgb(156, 163, 175)' />} />
                </span>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(prices, 'price')}>
                    <SearchItem text={queries.price} defaultText={'Chọn giá'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<TbReportMoney color='rgb(156, 163, 175)' />} />
                </span>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(areas, 'area')}>
                    <SearchItem text={queries.area} defaultText={'Chọn diện tích'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<RiCrop2Line color='rgb(156, 163, 175)' />} />
                </span>
                <button
                    type='button'
                    onClick={handleSearch}
                    className='outline-none py-2 px-4 flex-1 w-full bg-secondary1 text-[12.3px] flex items-center justify-center gap-2 text-white font-medium'
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
            {isShowModal && <Modal content={content} name={name} arrMinMax={arrMinMax} setIsShowModal={setIsShowModal} handleSubmit={handleSummit} queries={queries} />}
        </>
    )
}

export default Search