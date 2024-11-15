//이모지부터 일출일몰까지

// App.jsx 또는 원하는 컴포넌트 파일에서 작성
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNowWeather } from '../features/currentSlice' // slice 파일의 경로를 정확히 입력

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
// import SearchIcon from '@mui/icons-material/Search's

import './css/Weather.css'

const Weather = () => {
   const dispatch = useDispatch()
   const { nowweather, loading, error } = useSelector((state) => state.nowweather)

   useEffect(() => {
      dispatch(fetchNowWeather('incheon')) // 인천의 현재 날씨 데이터 가져오기
   }, [dispatch])

   //콘솔로 찍어보기
   /*    useEffect(() => {
      console.log('현재 날씨 데이터:', nowweather)
   }, [nowweather]) */

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>
   if (!nowweather) return <p>No data available</p>

   const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000) // 초 단위 타임스탬프를 밀리초로 변환
      return date.toLocaleTimeString('ko-KR', {
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
         timeZone: 'Asia/Seoul', // 한국 시간대
      })
   }

   return (
      <div className="mainSystem">
         <p className="region">{nowweather.name}</p>
         <form /* onSubmit={handleSearch} */ className="search_form">
            <TextField sx={{ backgroundColor: 'white', width: 105 }} label="지역 바꾸기" id="fullWidth" /* value={searchQuery} */ /* onChange={handleInputChange} */ />
            <Button sx={{ width: 50, height: 56, backgroundColor: 'white', color: 'black', border: '2px solid black', marginLeft: '5px' }} variant="outlined" type="submit">
               검색
            </Button>
         </form>

         <p className="describe">{nowweather.weather[0].description}</p>
         <p className="degree">{nowweather.main.temp}°C</p>
         <ul className="sunUpdown">
            <li>
               <p>일출</p>
               <p className="suntime">{formatTime(nowweather.sys.sunrise)}</p>
            </li>
            <li className="line">|</li>
            <li>
               <p>일몰</p>
               <p className="suntime">{formatTime(nowweather.sys.sunset)}</p>
            </li>
         </ul>
      </div>
   )
}

export default Weather
