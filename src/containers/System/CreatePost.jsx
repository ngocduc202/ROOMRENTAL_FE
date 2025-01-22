import React, { memo, useEffect, useState } from 'react'
import { Address, Button, Loading, Overview, Map } from '../../components'
import { BsCameraFill } from 'react-icons/bs'
import { apiCreatePost, apiUpdatePost, apiUpLoadImages } from '../../services'
import { ImBin } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'
import { resetDataEdit } from '../../store/action'
import { attention } from '../../ultils/constant'
const CreatePost = ({ isEdit }) => {

  const { dataEdit } = useSelector(state => state.post)
  const dispatch = useDispatch()

  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.categoryCode || '',
      title: dataEdit?.title || '',
      priceNumber: dataEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
      address: dataEdit?.address || '',
      priceCode: dataEdit?.priceCode || '',
      areaCode: dataEdit?.areaCode || '',
      description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
      target: dataEdit?.overviews?.target || '',
      province: dataEdit?.province || '',
    }

    return initData
  })
  const [imagesPreview, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { prices, areas, categories, provinces } = useSelector(state => state.app)
  const { currentData } = useSelector(state => state.user)
  const [invalidFields, setInvalidFields] = useState([])

  useEffect(() => {
    if (dataEdit) {
      let images = JSON.parse(dataEdit?.images?.image)
      images && setImagesPreview(images)
    }
  }, [dataEdit])


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
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 0, 90)
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
    const result = validate(finalPayload, setInvalidFields)
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id
        finalPayload.attributesId = dataEdit?.attributesId
        finalPayload.imagesId = dataEdit?.imagesId
        finalPayload.overviewId = dataEdit?.imagesId

        const response = await apiUpdatePost(finalPayload)
        if (response?.data?.err === 0) {
          Swal.fire('Thành công', 'Đã sửa bài đăng thành công', 'success').then(() => {
            resetPayload()
            dispatch(resetDataEdit())
          })
        } else {
          Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
      } else {
        const response = await apiCreatePost(finalPayload)
        if (response?.data?.err === 0) {
          Swal.fire('Thành công', 'Đăng tin thành công', 'success').then(() => {
            resetPayload()
            dispatch(resetDataEdit())
          })
        } else {
          Swal.fire('Oops!', 'Đã có lỗi xảy ra', 'error')
        }
      }
    }
  }
  const resetPayload = () => {
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
  }
  return (
    <div className='px-6'>
      <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>{isEdit ? 'Chỉnh sửa tin đăng' : 'Đăng tin mới'}</h1>
      <div className='flex gap-4 '>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Address invalidFields={invalidFields} setInvalidFields={setInvalidFields} setPayload={setPayload} />
          <Overview invalidFields={invalidFields} setInvalidFields={setInvalidFields} payload={payload} setPayload={setPayload} />
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
              <small className='text-red-500 italic block w-full'>
                {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images').message}
              </small>
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
            <Button onClick={handleSubmit}
              text={isEdit ? 'Cập nhật' : 'Tạo mới'}
              fullWith={true}
              bgColor='bg-green-600'
              textColor='text-white'
            />
          </div>
        </div>
        <div className='w-[30%] flex-none pt-12'>
          <Map address={payload?.address} />
          <div className='mt-8 bg-orange-100 text-orange-900 rounded-md p-4'>
            <h4 className='text-xl font-medium mb-4'>Lưu ý tin đăng</h4>
            <div className='text-sm list-disc text-justify'>
              {attention.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CreatePost)