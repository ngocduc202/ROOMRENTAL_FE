import icons from '../../ultils/icons';
import { memo, useEffect, useState } from 'react';
import { getNumbersArea, getNumbersPrice } from '../../ultils/Common/getNumbers'
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes';
const { GrLinkPrevious } = icons


const Modal = ({ setIsShowModal, content, name, handleSubmit, queries, arrMinMax, defaultText }) => {

    const [persent1, setPersent1] = useState(name === 'price' && arrMinMax?.priceArr
        ? arrMinMax?.priceArr[0]
        : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[0] : 0)
    const [persent2, setPersent2] = useState(name === 'price' && arrMinMax?.priceArr
        ? arrMinMax?.priceArr[1]
        : name === 'area' && arrMinMax?.areaArr ? arrMinMax?.areaArr[1] : 100)
    const [activedEl, setActivedEl] = useState('');


    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active');
        if (activedTrackEl) {
            let minPersent = persent1 <= persent2 ? persent1 : persent2
            activedTrackEl.style.left = `${minPersent}%`;
            let maxPersent = persent1 >= persent2 ? (100 - persent1) : (100 - persent2)
            activedTrackEl.style.right = `${maxPersent}%`;
        }
    }, [persent1, persent2]);


    const handleClickTrack = (e, value) => {
        e.stopPropagation()
        const stackEl = document.getElementById('track');
        const stackRect = stackEl.getBoundingClientRect();
        let percent = value ? value : Math.round((e.clientX - stackRect.left) * 100 / stackRect.width)
        if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
            setPersent1(percent)
        } else {
            setPersent2(percent)
        }
    };

    const convertPersent = (persent) => {
        return name === 'price' ? (Math.ceil(Math.round((persent * 1.5)) / 5) * 5) / 10 :
            name === 'area' ? (Math.ceil(Math.round((persent * 0.9)) / 5) * 5) : 0
    }

    const convert15to100 = (persent) => {
        let target = name === 'price' ? 15 : name === 'area' ? 90 : 1
        return Math.floor((persent / target) * 100)
    }



    const handleActive = (code, value) => {
        setActivedEl(code)
        let arrMaxMin = name === 'price' ? getNumbersPrice(value) : getNumbersArea(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setPersent1(0)
                setPersent2(convert15to100(1))
            }
            if (arrMaxMin[0] === 20) {
                setPersent1(0)
                setPersent2(convert15to100(20))
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPersent1(100)
                setPersent2(100)
            }
        }

        if (arrMaxMin.length === 2) {
            setPersent1(convert15to100(arrMaxMin[0]))
            setPersent2(convert15to100(arrMaxMin[1]))
        }
    }

    const handleBeforeSubmit = (e) => {
        let min = persent1 <= persent2 ? persent1 : persent2
        let max = persent1 <= persent2 ? persent2 : persent1
        let arrMinMax = [convertPersent(min), convertPersent(max)]
        const gaps = name === "price" ?
            getCodes(arrMinMax, content)
            : name === "area" ? getCodesArea(arrMinMax, content) : []
        handleSubmit(e, {
            [`${name}Code`]: gaps?.map(item => item.code),
            [name]: `Từ ${convertPersent(min)} - ${convertPersent(max)} ${name === 'price' ? 'triệu' : 'm2'}`
        }, {
            [`${name}Arr`]: [min, max]
        }
        )
    }

    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(false)
            }}
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-50 flex items-center justify-center'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className='w-2/5 h-[500px] bg-white rounded-md relative'>
                <div className='h-[45px] flex items-center px-4 border-b border-gray-100'>
                    <span
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowModal(false)
                        }}
                        className='cursor-pointer'
                    >
                        <GrLinkPrevious color='black' size={24} />
                    </span>
                </div>
                {(name === 'category' || name === 'province') &&
                    <div className='p-4 flex flex-col'>
                        <span
                            className='py-2 flex gap-2 items-center border-b border-gray-200'>
                            <input
                                type="radio"
                                name={name}
                                id='default'
                                value={defaultText || ''}
                                checked={!queries[`${name}Code`] ? true : false}
                                onClick={(e) => handleSubmit(e, { [name]: defaultText, [`${name}Code`]: null })} />
                            <label htmlFor='default'>{defaultText}</label>
                        </span>
                        {content?.map(item => {
                            return (
                                <span key={item?.code}
                                    className='py-2 flex gap-2 items-center border-b border-gray-200'>
                                    <input
                                        type="radio"
                                        name={name}
                                        value={item?.code}
                                        id={item?.code}
                                        checked={item?.code === queries[`${name}Code`]}
                                        onClick={(e) => handleSubmit(e, { [name]: item.value, [`${name}Code`]: item.code })} />
                                    <label htmlFor={item?.code}>{item?.value}</label>
                                </span>
                            )
                        })}
                    </div>}
                {(name === 'area' || name === 'price') &&
                    <div className='p-12 py-20'>
                        <div className="flex flex-col items-center justify-center relative">
                            <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>
                                {persent1 === 100 && persent2 === 100 ? `Trên ${convertPersent(persent1)} ${name === 'price' ? 'triệu' : 'm2'}` :
                                    ` Từ ${persent1 <= persent2 ? convertPersent(persent1) : convertPersent(persent2)} - ${persent2 >= persent1
                                        ? convertPersent(persent2) : convertPersent(persent1)}
                                    ${name === 'price' ? 'triệu' : 'm2'}`
                                }
                            </div>
                            <div
                                onClick={handleClickTrack}
                                id='track'
                                className="slider-track h-[5px] bg-gray-300 rounded-full absolute top-0 bottom-0 w-full"></div>
                            <div onClick={handleClickTrack} id='track-active'
                                className="slider-track h-[5px] bg-orange-600 rounded-full absolute top-0 bottom-0"></div>
                            <input
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={persent1}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                onChange={(e) => {
                                    setPersent1(+e.target.value)
                                    activedEl && setActivedEl('')
                                }}
                            />
                            <input
                                max="100"
                                min="0"
                                step="1"
                                type="range"
                                value={persent2}
                                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                                onChange={(e) => {
                                    setPersent2(+e.target.value)
                                    activedEl && setActivedEl('')
                                }}
                            />
                            <div className='absolute z-30 top-6 left-0 right-0 flex items-center justify-between'>
                                <span className='cursor-pointer' onClick={(e) => {
                                    e.stopPropagation()
                                    handleClickTrack(e, 0)
                                }}>0</span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 100)
                                    }}
                                    className='mr-[-12px] cursor-pointer'>{name === 'price' ? '15 triệu +' : name === 'area' ? 'Trên 90 m2' : 'Toán quốc'}</span>
                            </div>
                        </div>
                        <div className='mt-24'>
                            <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
                            <div className='flex gap-2 items-center flex-wrap w-full'>
                                {content?.map(item => {
                                    return (
                                        <button
                                            key={item?.code}
                                            onClick={() => handleActive(item?.code, item?.value)}
                                            className={`px-4 py-2 rounded-md cursor-pointer ${item?.code === activedEl ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                            {item?.value}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
                {
                    (name === 'price' || name === 'area') &&
                    <button
                        type='button'
                        className='w-full absolute bottom-0 mt-4 bg-[#FFA500] py-2 rounded-bl-md rounded-br-md font-medium'
                        onClick={handleBeforeSubmit}
                    >
                        ÁP DỤNG
                    </button>
                }
            </div>
        </div>
    )
}

export default memo(Modal)