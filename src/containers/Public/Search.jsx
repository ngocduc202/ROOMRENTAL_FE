import React, { useEffect, useState } from 'react'
import { Modal, SearchItem } from '../../components'
import icons from '../../ultils/icons'
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../store/action'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { path } from '../../ultils/constant';



const { BsChevronRight, GoLocation, TbReportMoney, RiCrop2Line, BiBuildingHouse, FiSearch } = icons
const Search = () => {

    const [isShowModal, setIsShowModal] = useState(false);
    const [content, setContent] = useState([]);
    const { provinces, areas, prices, categories } = useSelector(state => state.app)
    const [name, setName] = useState('');
    const [queries, setQueries] = useState({});
    const [arrMinMax, setArrMinMax] = useState({})
    const dispatch = useDispatch()
    const [defaultText, setDefaultText] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!location.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location])


    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setDefaultText(defaultText)
        setIsShowModal(true)
    };

    const handleSummit = (e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
    }

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes("Number") || item[0].includes("Code")).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => {
            queryCodesObj[item[0]] = item[1]
        })
        const queryText = Object.entries(queries).filter(item => !item[0].includes("Code") || !item[0].includes("Number"))
        dispatch(action.getPostsLimit(queryCodesObj))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê tất cả'} ${queryTextObj.province ? ` tỉnh ${queryTextObj.province}` : ''}
        ${queryTextObj.price ? ` giá ${queryTextObj.price}` : ''}
        ${queryTextObj.area ? ` diện tích ${queryTextObj.area}` : ''}
        `
        navigate({
            pathname: `/${path.SEARCH}`,
            search: createSearchParams(queryCodesObj).toString()
        }, { state: { titleSearch } })
    }

    return (
        <>
            <div
                className='p-[10px] w-3/5 my-3 bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center justify-around gap-2'>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')}>
                    <SearchItem text={queries.category} defaultText={'Tìm tất cả'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<BiBuildingHouse color='rgb(156, 163, 175)' />} fontWeight />
                </span>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')}>
                    <SearchItem text={queries.province} defaultText={'Toàn quốc'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<GoLocation color='rgb(156, 163, 175)' />} />
                </span>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(prices, 'price', 'Chọn giá')}>
                    <SearchItem text={queries.price} defaultText={'Chọn giá'} iconAfter={<BsChevronRight color='rgb(156, 163, 175)' />}
                        iconBefore={<TbReportMoney color='rgb(156, 163, 175)' />} />
                </span>
                <span className='flex-1 cursor-pointer' onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')}>
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
            {isShowModal && <Modal
                content={content}
                name={name}
                arrMinMax={arrMinMax}
                setIsShowModal={setIsShowModal}
                handleSubmit={handleSummit} queries={queries}
                defaultText={defaultText}
            />}
        </>
    )
}

export default Search