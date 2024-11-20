import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchThreeWeather } from '../features/threehourSlice'

import Search from './Search'

import './css/Three.css'

const koreanCities = [
   { name: 'Goyang-si', korean: '고양' },
   { name: 'Seoul', korean: '서울' },
   { name: 'Incheon', korean: '인천' },
   { name: 'Seongnam-si', korean: '성남' },
   { name: 'Ansan-si', korean: '안산' },
   { name: 'Yongin', korean: '용인' },
   { name: 'Suwon-si', korean: '수원' },
   { name: 'Hwaseong-si', korean: '화성' },
   { name: 'Pyeongtaek-si', korean: '평택' },
   { name: 'Cheongju-si', korean: '청주' },
   { name: 'Daejeon', korean: '대전' },
   { name: 'Daegu', korean: '대구' },
   { name: 'Pohang', korean: '포항' },
   { name: 'Jeonju', korean: '전주' },
   { name: 'Ulsan', korean: '울산' },
   { name: 'Gwangju', korean: '광주' },
   { name: 'Gimhae', korean: '김해' },
   { name: 'Changwon', korean: '창원' },
   { name: 'Busan', korean: '부산' },
   { name: 'Jeju City', korean: '제주' },
]

const Three = () => {
   const dispatch = useDispatch()
   const { threeweather, loading, error } = useSelector((state) => state.threeweather)
   const [selectedCity, setSelectedCity] = useState({ name: 'Incheon', korean: '인천' }) // 기본값

   // 처음 렌더링 시 기본값으로 날씨 데이터를 가져옴
   useEffect(() => {
      dispatch(fetchThreeWeather(selectedCity.name)) // 선택된 도시의 영어 이름으로 API 호출
   }, [dispatch, selectedCity])

   const getKoreanCityName = (englishName) => {
      const city = koreanCities.find((city) => city.name === englishName)
      return city ? city.korean : englishName // 매칭된 도시가 없으면 영어 이름 그대로 사용
   }

   const handleCityChange = (event, value) => {
      if (value) {
         setSelectedCity(value) // 드롭다운에서 선택된 도시 업데이트
      }
   }

   if (loading) return <p className="loading">L o a d i n g . . .</p>
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
         timeZone: 'Asia/Seoul',
      })
   }

   return (
      <div className="daysSystem">
         {/* 지역 이름 */}
         <p className="region">{getKoreanCityName(selectedCity.name)}</p>
         {/* 드롭다운 폼 */}
         <Search
            koreanCities={koreanCities} // 도시 목록 전달
            selectedCity={selectedCity} // 현재 선택된 도시 전달
            onCityChange={handleCityChange} // 도시 변경 핸들러 전달
         />

         <div className="forecast-list">
            {threeweather.list.slice(0, 20).map((forecast, index) => (
               <div key={index} className="forecast-item">
                  <p>{formatTime(forecast.dt)}</p>
                  <p>{forecast.main?.temp.toFixed(1)}°C</p>
                  <p>{forecast.weather[0]?.description}</p>
                  {/* 아이콘 경로 수정 */}
                  <img src={`https://openweathermap.org/img/wn/${forecast.weather[0]?.icon}@2x.png`} alt="날씨 아이콘" />
               </div>
            ))}
         </div>
      </div>
   )
}
//옵셔널 체이닝(?.)은 속성이나 요소가 존재하면 그 값을 반환하고, 존재하지 않으면 undefined를 반환합니다.
//@2x = 2배 크기
export default Three
