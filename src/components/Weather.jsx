import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Switch from '@mui/material/Switch'

import { fetchNowWeather } from '../features/currentSlice'
import Search from './Search'

import './css/Weather.css'

// nono, happy, candy를 그냥 검색해봤는데 다른 나라의 도시 결과로 나옴 -> 나라 제한은 유료 => 검색 도시를 제한함
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

const weatherDescriptions = {
   '가벼운 비를 동반한 천둥구름': 'thunderstorm with light rain',
   '비를 동반한 천둥구름': 'thunderstorm with rain',
   '폭우를 동반한 천둥구름': 'thunderstorm with heavy rain',
   '약한 천둥구름': 'light thunderstorm',
   천둥구름: 'thunderstorm',
   '강한 천둥구름': 'heavy thunderstorm',
   '불규칙적 천둥구름': 'ragged thunderstorm',
   '약한 연무를 동반한 천둥구름': 'thunderstorm with light drizzle',
   '연무를 동반한 천둥구름': 'thunderstorm with drizzle',
   '강한 안개비를 동반한 천둥구름': 'thunderstorm with heavy drizzle',
   '가벼운 안개비': 'light intensity drizzle',
   안개비: 'drizzle',
   '강한 안개비': 'heavy intensity drizzle',
   '가벼운 적은비': 'light intensity drizzle rain',
   적은비: 'drizzle rain',
   '강한 적은비': 'heavy intensity drizzle rain',
   '소나기와 안개비': 'shower rain and drizzle',
   '강한 소나기와 안개비': 'heavy shower rain and drizzle',
   소나기: 'shower drizzle',
   '실 비': 'light rain',
   '보통 비': 'moderate rain',
   '강한 비': 'heavy intensity rain',
   '매우 강한 비': 'very heavy rain',
   '극심한 비': 'extreme rain',
   우박: 'freezing rain',
   '약한 소나기 비': 'light intensity shower rain',
   '소나기 비': 'shower rain',
   '강한 소나기 비': 'heavy intensity shower rain',
   '불규칙적 소나기 비': 'ragged shower rain',
   '가벼운 눈': 'light snow',
   눈: 'snow',
   '강한 눈': 'heavy snow',
   진눈깨비: 'sleet',
   '소나기 진눈깨비': 'shower sleet',
   '약한 비와 눈': 'light rain and snow',
   '비와 눈': 'rain and snow',
   '약한 소나기 눈': 'light shower snow',
   '소나기 눈': 'shower snow',
   '강한 소나기 눈': 'heavy shower snow',
   박무: 'mist',
   연기: 'smoke',
   연무: 'haze',
   '모래 먼지': 'sand, dust whirls',
   안개: 'fog',
   모래: 'sand',
   먼지: 'dust',
   화산재: 'volcanic ash',
   돌풍: 'squalls',
   토네이도: 'tornado',
   맑음: 'clear sky',
   '약간의 구름이 낀 하늘': 'few clouds',
   구름조금: 'scattered clouds',
   튼구름: 'broken clouds',
   온흐림: 'overcast clouds',
   태풍: 'tropical storm',
   한랭: 'cold',
   고온: 'hot',
   바람부는: 'windy',
   우박: 'hail',
   '바람이 거의 없는': 'calm',
   '약한 바람': 'light breeze',
   '부드러운 바람': 'gentle breeze',
   '중간 세기 바람': 'moderate breeze',
   '신선한 바람': 'fresh breeze',
   '센 바람': 'strong breeze',
   '돌풍에 가까운 센 바람': 'high win',
   돌풍: 'gale',
   '심각한 돌풍': 'severe gale',
   폭풍: 'storm',
   '강한 폭풍': 'violent storm',
   허리케인: 'hurricane',
}

const Weather = () => {
   const dispatch = useDispatch()
   const { nowweather, loading, error } = useSelector((state) => state.nowweather)
   const [selectedCity, setSelectedCity] = useState({ name: 'Incheon', korean: '인천' }) // 기본값

   /* 토글 ? */
   const [checked, setChecked] = useState(false)

   const handleChange = (event) => {
      setChecked(event.target.checked) // 상태 업데이트
   }

   /*  */

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
         hourCycle: 'h23',
      })
   }

   if (loading) return <p className="loading">L o a d i n g . . .</p>
   if (error) return <p>Error: {error}</p>
   if (!nowweather) return <p>No data available</p>

   return (
      <>
         {/* 토글 */}
         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft: '10px' }}>
            <p>한국어</p>
            <Switch
               checked={checked}
               onChange={handleChange}
               color="success" // 기본 스타일 색상
            />
            <p>English</p>
            {/* <p>{checked ? 'ON' : 'OFF'}</p> */}
         </div>
         {/*  */}

         {/* nowweather 초기 state는 null이므로 nowweather이 있을때만 값을 보여주도록 함 */}
         {nowweather && (
            <div className="mainSystem">
               {/* 지역 이름 */}
               <p className="region">{checked ? selectedCity.name : getKoreanCityName(selectedCity.name)}</p>

               {/* 드롭다운 폼 */}
               <Search
                  koreanCities={koreanCities} // 도시 목록 전달
                  selectedCity={selectedCity} // 현재 선택된 도시 전달
                  onCityChange={handleCityChange} // 도시 변경 핸들러 전달
                  checked={checked} // 체크 상태 전달
               />
               {/* <TextField {...params} />로 Autocomplete와 TextField 간 연결을 유지합니다. */}
               {/* 날씨 정보 */}
               <p>
                  <img src={`https://openweathermap.org/img/wn/${nowweather.weather[0]?.icon}@4x.png`} alt="날씨 아이콘" />
               </p>

               <p className="describe">{checked ? weatherDescriptions[nowweather.weather[0].description] || nowweather.weather[0].description : nowweather.weather[0].description}</p>

               <p className="degree">{nowweather.main.temp.toFixed(1)}°C</p>
               {/* 일출 및 일몰 */}
               <ul className="sunUpdown">
                  <li>
                     <p>{checked ? 'Sunrise' : '일출'}</p>
                     <p className="suntime">{formatTime(nowweather.sys.sunrise)}</p>
                  </li>
                  <li className="line">|</li>
                  <li>
                     <p>{checked ? 'Sunset' : '일몰'}</p>
                     <p className="suntime">{formatTime(nowweather.sys.sunset)}</p>
                  </li>
               </ul>
            </div>
         )}
      </>
   )
}

export default Weather
