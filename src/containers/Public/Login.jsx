import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/action'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
const Login = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, msg, update } = useSelector(state => state.auth)
  const [isRegister, setIsRegister] = useState(location.state?.flag)
  const [invalidFields, setInvalidFields] = useState([])
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    name: ''
  })
  useEffect(() => {
    setIsRegister(location.state?.flag)
  }, [location.state?.flag])
  useEffect(() => {
    isLoggedIn && navigate('/')
  }, [isLoggedIn])

  useEffect(() => {
    msg && Swal.fire("Thông báo", msg, "error")
  }, [msg, update])


  const hanldeSubmit = async () => {
    let finalPayload = isRegister ? payload : { phone: payload.phone, password: payload.password }
    let invalids = validate(finalPayload)
    if (invalids === 0) isRegister ? dispatch(actions.register(finalPayload)) : dispatch(actions.login(finalPayload))
  }
  const validate = (payload) => {
    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          message: 'Bạn không được bỏ trống trường này.'
        }])
        invalids++
      }
    })
    fields.forEach(item => {
      switch (item[0]) {
        case 'password':
          if (item[1].length < 6) {
            setInvalidFields(prev => [...prev, {
              name: item[0],
              message: 'Mật khẩu phải có tối thiểu 6 kí tự.'
            }])
            invalids++
          }
          break;
        case 'phone':
          if (!+item[1]) {
            setInvalidFields(prev => [...prev, {
              name: item[0],
              message: 'Số điện thoại không hợp lệ.'
            }])
            invalids++
          }
          break

        default:
          break;
      }
    })
    return invalids
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <div className='bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm'>
        <h3 className='font-semibold text-2xl mb-3'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</h3>
        <div className='w-full flex flex-col gap-5'>
          {isRegister &&
            <InputForm
              label='HỌ TÊN'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              value={payload.name}
              setValue={setPayload}
              keyPayload={'name'}
            />}
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label='SỐ ĐIỆN THOẠI'
            value={payload.phone}
            setValue={setPayload}
            keyPayload={'phone'}
          />
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label='MẬT KHẨU'
            value={payload.password}
            setValue={setPayload}
            keyPayload={'password'}
            type='password'
          />
          <Button
            text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
            bgColor='bg-secondary1'
            textColor='text-white'
            fullWith
            onClick={hanldeSubmit}
          />
        </div>
        <div className='mt-7 flex items-center justify-between'>
          {isRegister ? <small>Bạn đã có tài khoản ? <span className='text-blue-700 hover:text-red-500 hover:underline cursor-pointer'
            onClick={() => {
              setIsRegister(false)
              setPayload({
                phone: '',
                password: '',
                name: ''
              })
            }}
          >Đăng nhập ngay
          </span></small> :
            <>
              <span className='text-blue-700 hover:text-red-500 cursor-pointer text-sm'>Bạn quên mật khẩu ?</span>
              <span onClick={() => {
                setIsRegister(true)
                setPayload({
                  phone: '',
                  password: '',
                  name: ''
                })
              }} className='text-blue-700 hover:text-red-500 cursor-pointer text-sm'>Tạo tài khoản mới</span>
            </>
          }
        </div>

      </div>
    </div>
  )
}

export default Login