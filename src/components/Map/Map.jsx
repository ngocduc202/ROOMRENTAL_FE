import React, { useEffect, useState } from 'react'
import { apiGetLongtitudeAndLatitudeFromAddress } from '../../services'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { IoLocationOutline } from "react-icons/io5";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const Map = ({ address = '', zoom = 12 }) => {

  const [center, setCenter] = useState([10.762622, 106.660172])
  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const response = await apiGetLongtitudeAndLatitudeFromAddress(address?.replace("Địa chỉ:", "").trim())
        if (response.status === 200 && response.data.features?.length > 0) {
          setCenter([
            response?.data?.features[0]?.geometry?.coordinates[1],
            response?.data?.features[0]?.geometry?.coordinates[0],
          ])
        } else {
          window.navigator.geolocation.getCurrentPosition((position) => {
            setCenter([
              position.coords.latitude,
              position.coords.longitude
            ])
          })
        }
      } catch (error) {
        console.error('Error response:', error.response?.data)
      }
    }
    if (address) {
      fetchCenter()
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setCenter([
          position.coords.latitude,
          position.coords.longitude
        ])
      })
    }

  }, [address])
  return (
    <div className='w-full h-[300px]'>
      {center && center.length > 0 &&
        <MapContainer center={center} zoom={zoom} className='w-full h-full'>
          <TileLayer url={url} attribution={attribution}>
            <Marker position={center} icon={<IoLocationOutline />}>
              <Popup autoClose={false} closeButton={true} className='z-50'>
                {address}
              </Popup>
            </Marker>
          </TileLayer>
        </MapContainer>
      }
    </div>
  )
}

export default Map