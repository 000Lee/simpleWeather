import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAirWeather } from '../features/airSlice'

const AirPollution = () => {
   const dispatch = useDispatch()
   const { airweather, loading, error } = useSelector((state) => state.airweather)

   useEffect(() => {
      dispatch(fetchAirWeather('incheon')) // "incheon"으로 대기 상태 요청
   }, [dispatch])

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>
   if (!airweather || !airweather.list || airweather.list.length === 0) {
      return <p>데이터가 없습니다.</p>
   }

   return (
      <div>
         <h1>대기질 정보</h1>
         <div>
            <p>AQI: {airweather.list[0].main.aqi}</p>
            <p>PM2.5: {airweather.list[0].components.pm2_5}</p>
            <p>PM10: {airweather.list[0].components.pm10}</p>
         </div>
      </div>
   )
}

export default AirPollution
