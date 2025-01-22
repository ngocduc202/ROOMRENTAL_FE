import React, { useEffect, useState } from 'react'
import { apiGetLongtitudeAndLatitudeFromAddress } from '../../services'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import { Icon } from 'leaflet'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [38, 38]

})
const Map = ({ address, zoom = 11 }) => {

  const [center, setCenter] = useState([])
  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const response = await apiGetLongtitudeAndLatitudeFromAddress(
          address?.replace("Địa chỉ:", "").trim()
        );
        if (response.status === 200 && response.data.features?.length > 0) {
          const latitude = response?.data?.features[0]?.geometry?.coordinates[1];
          const longitude = response?.data?.features[0]?.geometry?.coordinates[0];
          if (latitude && longitude) {
            setCenter([latitude, longitude]);
          }
        } else {
          window.navigator.geolocation.getCurrentPosition((position) => {
            setCenter([position.coords.latitude, position.coords.longitude]);
          });
        }
      } catch (error) {
        console.error("Error response:", error.response?.data);
      }
    };
    if (address) {
      fetchCenter()
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setCenter([
          position?.coords?.latitude,
          position?.coords?.longitude
        ])
      })
    }

  }, [address])
  return (
    <div className='w-full h-[300px] relative'>
      {address &&
        <div className='absolute bottom-1 right-1 z-[9999] w-[250px] bg-white shadow-md p-3 rounded-md text-xs'>
          {address}
        </div>
      }
      {center && center.length > 0 &&
        <MapContainer center={center} zoom={zoom} className="w-full h-[300px]">
          <TileLayer
            url={url}
            attribution={attribution}
          />
          <Marker position={center}
            icon={L.icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [0, -41],
            })}

            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup(); // Mở Popup khi hover
              },
              mouseout: (e) => {
                e.target.closePopup(); // Đóng Popup khi rời chuột
              },
            }}
          >
            <Popup>
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      }
    </div>
  )
}

export default Map