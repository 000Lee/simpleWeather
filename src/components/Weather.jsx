import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNowWeather } from '../features/currentSlice'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

import './css/Weather.css'

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

const Weather = () => {
   const dispatch = useDispatch()
   const { nowweather, loading, error } = useSelector((state) => state.nowweather)
   const [selectedCity, setSelectedCity] = useState({ name: 'Incheon', korean: '인천' }) // 기본값

   // 처음 렌더링 시 기본값으로 날씨 데이터를 가져옴
   useEffect(() => {
      dispatch(fetchNowWeather(selectedCity.name)) // 선택된 도시의 영어 이름으로 API 호출
   }, [dispatch, selectedCity])
   //기본적으로 dispatch는 변하지 않는 함수지만, 린트 규칙(ESLint)에서 안정성을 보장하기 위해 의존성 배열에 포함하라고 권장합니다.

   //의존성 배열에 selectedCity를 포함하지 않으면, 선택된 도시가 바뀌어도 useEffect가 실행되지 않아 날씨 데이터가 갱신되지 않습니다.

   const getKoreanCityName = (englishName) => {
      const city = koreanCities.find((city) => city.name === englishName)
      return city ? city.korean : englishName // 매칭된 도시가 없으면 영어 이름 그대로 사용
   }

   const handleCityChange = (event, value) => {
      if (value) {
         setSelectedCity(value) // 드롭다운에서 선택된 도시 업데이트
      }
   }

   const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000) // 초 단위 타임스탬프를 밀리초로 변환
      return date.toLocaleTimeString('ko-KR', {
         hour: '2-digit',
         minute: '2-digit',
         timeZone: 'Asia/Seoul',
      })
   }

   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>
   if (!nowweather) return <p>No data available</p>

   return (
      <>
         {/* nowweather 초기 state는 null이므로 nowweather이 있을때만 값을 보여주도록 함 */}
         {nowweather && (
            <div className="mainSystem">
               {/* 지역 이름 */}
               <p className="region">{getKoreanCityName(nowweather.name)}</p>
               {/* 드롭다운 폼 */}
               <Autocomplete
                  options={koreanCities} // 한국 도시 리스트
                  getOptionLabel={(option) => option.korean} // 한글 이름 표시
                  value={selectedCity} // 현재 선택된 도시
                  onChange={handleCityChange} // 선택 시 호출
                  disableClearable // Clear 버튼 비활성화
                  renderInput={(params) => <TextField {...params} label="도시를 클릭하세요" variant="outlined" sx={{ width: 300 }} />}
               />
               {/* <TextField {...params} />로 Autocomplete와 TextField 간 연결을 유지합니다. */}
               {/* 날씨 정보 */}
               <p>
                  <img src={`https://openweathermap.org/img/wn/${nowweather.weather[0]?.icon}@4x.png`} alt="날씨 아이콘" />
               </p>
               <p className="describe">{nowweather.weather[0].description}</p>
               <p className="degree">{nowweather.main.temp.toFixed(1)}°C</p>
               {/* 일출 및 일몰 */}
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
         )}
      </>
   )
}

export default Weather
