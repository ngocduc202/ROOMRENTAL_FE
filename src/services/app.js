import axiosConfig from "../axiosConfig";
import axios from "axios";


export const apiGetPrices = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosConfig({
      method: 'get',
      url: '/api/v1/price/all',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetAreas = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosConfig({
      method: 'get',
      url: '/api/v1/area/all',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetProvinces = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axiosConfig({
      method: 'get',
      url: '/api/v1/province/all',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://vapi.vnappmob.com/api/v2/province/'
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})

export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
  try {
      const response = await axios({
          method: 'get',
          url: `https://vapi.vnappmob.com/api/v2/province/district/${provinceId}`
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})

export const apiGetLongtitudeAndLatitudeFromAddress = (address) => new Promise(async (resolve, reject) => {
  console.log(address)
  try {
      const response = await axios({
          method: 'get',
          url: `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=368e75d05eee4aeca9904b6dda17d316`
      })
      resolve(response)
  } catch (error) {
      reject(error)
  }
})