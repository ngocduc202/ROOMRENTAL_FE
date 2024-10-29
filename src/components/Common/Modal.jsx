import icons from '../../ultils/icons';
import {useEffect, useState} from 'react';
const { GrLinkPrevious } = icons


const Modal = ({setIsShowModal , content , name}) => {

    const [persent1, setPersent1] = useState(0);
    const [persent2, setPersent2] = useState(100);
    const [activedEl, setActivedEl] = useState('');


    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active');
        let minPersent = persent1 <= persent2 ? persent1 :  persent2
        activedTrackEl.style.left = `${minPersent}%`;
        let maxPersent = persent1 >= persent2 ? (100 - persent1) : (100 - persent2)
        activedTrackEl.style.right = `${maxPersent}%`;
    }, [persent1 , persent2]);


    const handleClickTrack = (e , value) => {
        e.stopPropagation()
        const stackEl = document.getElementById('track');
        const stackRect = stackEl.getBoundingClientRect();
        let percent = value ? value : Math.round( (e.clientX - stackRect.left) * 100 / stackRect.width)
        if(Math.abs(percent - persent1) <= Math.abs(percent - persent2)){
           setPersent1(percent)
        }else {
            setPersent2(percent)
        }
    };

    const convertPersent = (persent) => {
        return (Math.ceil(Math.round((persent * 1.5)) / 5) * 5) / 10
    }

    const convert15to100 = (persent) => {
        return Math.floor((persent / 15) * 100)
    }

    const getNumbers = (string) => {
        return string.split(' ').map(item => +item).filter(item => !item === false)
    }

    const handlePrice = (code , value) => {
        setActivedEl(code)
        let arrMaxMin = getNumbers(value)
        if(arrMaxMin.length === 1) {
            if(arrMaxMin[0] === 1) {
                setPersent1(0)
                setPersent2(convert15to100(1))
            }
            if(arrMaxMin[0] === 15) {
                setPersent1(100)
                setPersent2(100)
            }
        }

        if(arrMaxMin.length === 2) {
            setPersent1(convert15to100(arrMaxMin[0]))
            setPersent2(convert15to100(arrMaxMin[1]))
        }
    }

    const handleSubmit = () => {

    };
    return (
        <div
            onClick={(e) => {
                e.stopPropagation()
                setIsShowModal(false)}}
            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-50 flex items-center justify-center'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                }}
                className='w-2/5 bg-white rounded-md'>
                <div className='h-[45px] flex items-center px-4 border-b border-gray-100'>
                    <span
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowModal(false)
                        }}
                        className='cursor-pointer'
                    >
                        <GrLinkPrevious color='black' size={24}/>
                    </span>
                </div>
                {(name === 'category' || name === 'province') &&
                    <div className='p-4 flex flex-col'>
                        {content?.map(item => {
                            return (
                                <span key={item?.code}
                                      className='py-2 flex gap-2 items-center border-b border-gray-200'>
                                <input type="radio" name={name} value={item?.code} id={item?.code}/>
                                <label htmlFor={item?.code}>{item?.value}</label>
                            </span>
                            )
                        })}
                    </div>}
                {(name === 'area' || name === 'price') &&
                    <div className='p-12 py-20'>
                        <div className="flex flex-col items-center justify-center relative">
                            <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>
                                {`Từ ${persent1 <= persent2 ? convertPersent(persent1) : convertPersent(persent2)} - ${persent2 >= persent1 ? convertPersent(persent2) : convertPersent(persent1)} triệu`}
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
                                    className='mr-[-12px] cursor-pointer'>15 triệu +</span>
                            </div>
                        </div>
                        <div className='mt-24'>
                            <h4 className='font-medium mb-4'>Chọn nhanh:</h4>
                            <div className='flex gap-2 items-center flex-wrap w-full'>
                                {content?.map(item => {
                                    return (
                                        <button
                                            key={item?.code}
                                            onClick={() => handlePrice(item?.code, item?.value)}
                                            className={`px-4 py-2 rounded-md cursor-pointer ${item?.code === activedEl ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                                            {item?.value}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
                <button
                    type='button'
                    className='w-full mt-4 bg-orange-500 py-2 rounded-bl-md rounded-br-md font-medium'
                    onClick={handleSubmit}
                >
                    Áp dụng
                </button>
            </div>
        </div>
    )
}

export default Modal