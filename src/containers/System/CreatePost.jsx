import React, { memo, useState } from 'react'
import { Address, Button, Loading, Overview } from '../../components'
import { BsCameraFill } from 'react-icons/bs'
import { apiCreatePost, apiUpLoadImages } from '../../services'
import { ImBin } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes'
import Swal from 'sweetalert2'
const CreatePost = () => {

  const [payload, setPayload] = useState({
    categoryCode: '',
    title: '',
    priceNumber: 0,
    areaNumber: 0,
    images: '',
    address: '',
    priceCode: '',
    areaCode: '',
    description: '',
    target: '',
    province: ''
  })
  const [imagesPreview, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { prices, areas, categories, provinces } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)


  const handleFiles = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    let images = []
    let files = e.target.files
    let formData = new FormData()
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', process.env.REACT_APP_ASSETS_NAME)
      let response = await apiUpLoadImages(formData)
      if (response.status === 200) images = [...images, response.data?.secure_url]
    }
    setIsLoading(false)
    setImagesPreview(prev => [...prev, ...images])
    setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
  }

  const handleDeleteImage = (image) => {
    setImagesPreview(prev => prev?.filter(i => i !== image))
    setPayload(prev => ({
      ...prev,
      images: prev?.images?.filter(i => i !== image)
    }))
  }

  const handleSubmit = async () => {
    let priceCodeArr = getCodes(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15)
    let priceCode = priceCodeArr[0]?.code
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas,)
    let areaCode = areaCodeArr[0]?.code
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userId: currentData?.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || 'Tất cả',
      label: `${categories?.find(item => item.code === payload.categoryCode)?.value} ${payload.address?.split(',')[0]}`
    }
    const response = await apiCreatePost(finalPayload)
    if (response?.data?.err === 0) {
      Swal.fire('Thành công', 'Đăng tin thành công', 'success').then(() => {
        setPayload({
          categoryCode: '',
          title: '',
          priceNumber: 0,
          areaNumber: 0,
          images: '',
          address: '',
          priceCode: '',
          areaCode: '',
          description: '',
          target: '',
          province: ''
        })
      })
    } else {
      Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
    }
  }

  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
      <div className='flex gap-4 '>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <div className='w-full'>
            <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn </small>
            <div className='w-full mb-6'>
              <label htmlFor="file" className='w-full gap-3 flex flex-col items-center my-4 justify-center border-gray-400 border-2 h-[200px] border-dashed rounded-md'>
                {isLoading ?
                  <Loading /> :
                  <div className='flex flex-col items-center justify-center'>
                    <BsCameraFill size={60} /> Thêm ảnh
                  </div>
                }
              </label>
              <input onChange={handleFiles} hidden type="file" id="file" multiple />
              <div className='w-full'>
                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                <div className='flex gap-4 items-center'>
                  {imagesPreview?.map(item => (
                    <div key={item} className='relative w-1/3 h-1/3 '>
                      <img src={item} alt="preview" className=' w-full h-full object-cover rounded-md' />
                      <span
                        title='Xóa'
                        className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                        onClick={() => handleDeleteImage(item)}
                      ><ImBin /></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Button onClick={handleSubmit} text='Đăng tin' fullWith={true} bgColor='bg-green-600' textColor='text-white' />
          </div>
        </div>
        <div className='w-[30%] flex-none'>
          map
        </div>
      </div>
    </div>
  )
}

export default memo(CreatePost)