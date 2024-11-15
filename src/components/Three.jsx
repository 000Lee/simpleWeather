import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreeWeather } from '../features/threehourSlice'

import './css/Three.css'

const Three = () => {
   const dispatch = useDispatch()
   const { threeweather, loading, error } = useSelector((state) => state.threeweather)

   useEffect(() => {
      dispatch(fetchThreeWeather('incheon'))
   }, [dispatch])

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>
   if (!threeweather || !threeweather.list) return <p>No data available</p>

   const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000)
      return date.toLocaleString('ko-KR', {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         timeZone: 'Asia/Seoul',
      })
   }

   return (
      <div className="daysSystem">
         <p className="daysRegion">{threeweather.city?.name}</p>

         <div className="forecast-list">
            {threeweather.list.slice(0, 18).map((forecast, index) => (
               <div key={index} className="forecast-item">
                  <p>{formatTime(forecast.dt)}</p>
                  <p>{forecast.main?.temp}°C</p>
                  <p>{forecast.weather[0]?.description}</p>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Three
