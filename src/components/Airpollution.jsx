import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Switch from '@mui/material/Switch'

import { fetchAirWeather } from '../features/airSlice'
import Search from './Search'

import './css/Airpollution.css'

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

const AirPollution = () => {
   const dispatch = useDispatch()
   const { airweather, loading, error } = useSelector((state) => state.airweather)
   const [selectedCity, setSelectedCity] = useState({ name: 'Incheon', korean: '인천' }) // 기본값

   /* 토글 ? */
   const [checked, setChecked] = useState(false)

   const handleChange = (event) => {
      setChecked(event.target.checked) // 상태 업데이트
   }
   /*  */

   useEffect(() => {
      dispatch(fetchAirWeather(selectedCity.name)) // 선택된 도시의 영어 이름으로 API 호출
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
   //onChange={(event, value) => {
   // event: 이벤트 객체 (클릭/키보드 입력 등)
   // value: 선택된 값
   //여기서 event 안써도 넣어줘야함 -> 매개변수의 이름이 아니라 순서에 따라 역할이 연결되니까

   if (loading) return <p className="loading">L o a d i n g . . .</p>
   if (error) return <p>Error: {error}</p>
   if (!airweather || !airweather.list || airweather.list.length === 0) {
      return <p>데이터가 없습니다.</p>
   }

   //대기질 지수
   const getAQIDescription = (aqi) => {
      switch (aqi) {
         case 1:
            return '매우 좋음'
         case 2:
            return '좋음'
         case 3:
            return '보통'
         case 4:
            return '나쁨'
         case 5:
            return '매우 나쁨'
         default:
            return '알 수 없음' // 예외 처리
      }
   }

   //대기질 지수 이모지
   const getAQIDescriptionWithEmoji = (aqi) => {
      switch (aqi) {
         case 1:
            return '😊'
         case 2:
            return '🙂'
         case 3:
            return '😐'
         case 4:
            return '😷'
         case 5:
            return '🤢'
         default:
            return '🤔'
      }
   }

   //초미세먼지 지수
   const getpm2_5Description = (pm2_5) => {
      if (pm2_5 >= 0 && pm2_5 < 16) {
         return '좋음' // 초미세먼지가 매우 적은 경우
      } else if (pm2_5 >= 16 && pm2_5 < 36) {
         return '보통' // 초미세먼지가 적은 경우
      } else if (pm2_5 >= 36 && pm2_5 < 76) {
         return '나쁨' // 초미세먼지가 보통인 경우
      } else if (pm2_5 >= 76) {
         return '매우 나쁨' // 초미세먼지가 심한 경우
      } else {
         return '알 수 없음' // 데이터가 없거나 잘못된 경우
      }
   }

   //초미세먼지 지수 이모지
   const getpm2_5DescriptionWithHeart = (pm2_5) => {
      if (pm2_5 >= 0 && pm2_5 < 16) {
         return '💙' // 초미세먼지가 매우 적은 경우
      } else if (pm2_5 >= 16 && pm2_5 < 36) {
         return '💚' // 초미세먼지가 적은 경우
      } else if (pm2_5 >= 36 && pm2_5 < 76) {
         return '💛' // 초미세먼지가 보통인 경우
      } else if (pm2_5 >= 76) {
         return '🖤' // 초미세먼지가 심한 경우
      } else {
         return '🤍' // 데이터가 없거나 잘못된 경우
      }
   }

   //미세먼지 지수
   const getpm10Description = (pm10) => {
      if (pm10 >= 0 && pm10 < 31) {
         return '좋음' // 초미세먼지가 매우 적은 경우
      } else if (pm10 >= 31 && pm10 < 81) {
         return '보통' // 초미세먼지가 적은 경우
      } else if (pm10 >= 81 && pm10 < 151) {
         return '나쁨' // 초미세먼지가 보통인 경우
      } else if (pm10 >= 151) {
         return '매우 나쁨' // 초미세먼지가 심한 경우
      } else {
         return '알 수 없음' // 데이터가 없거나 잘못된 경우
      }
   }

   //미세먼지 지수 이모지
   const getpm10DescriptionWithHeart = (pm10) => {
      if (pm10 >= 0 && pm10 < 31) {
         return '💙' // 초미세먼지가 매우 적은 경우
      } else if (pm10 >= 31 && pm10 < 81) {
         return '💚' // 초미세먼지가 적은 경우
      } else if (pm10 >= 81 && pm10 < 151) {
         return '💛' // 초미세먼지가 보통인 경우
      } else if (pm10 >= 151) {
         return '🖤' // 초미세먼지가 심한 경우
      } else {
         return '알 수 없음' // 데이터가 없거나 잘못된 경우
      }
   }

   /* toggle에 필요한 영한 번역 */
   const getAQIenglish = {
      '매우 좋음': 'Excellent',
      좋음: 'Good',
      보통: 'Ordinary ',
      나쁨: 'Bad',
      매우나쁨: 'Very bad',
      '알 수 없음': 'Unknown',
   }
   return (
      <>
         {/* 토글 */}
         <div style={{ display: 'flex', alignItems: 'center' }}>
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
         {airweather && (
            <div className="airMainSystem">
               {/* 지역 이름 */}
               <p className="region">{checked ? selectedCity.name : getKoreanCityName(selectedCity.name)}</p>
               {/* 드롭다운 폼 */}
               <Search
                  koreanCities={koreanCities} // 도시 목록 전달
                  selectedCity={selectedCity} // 현재 선택된 도시 전달
                  onCityChange={handleCityChange} // 도시 변경 핸들러 전달
                  checked={checked} // 체크 상태 전달
               />

               {/* 대기질 정보 */}
               <div className="imoji">
                  <p style={{ fontSize: '120px', marginTop: '30px' }}>{getAQIDescriptionWithEmoji(airweather.list[0].main.aqi)}</p>
                  <p className="aqiTitle">{checked ? 'Air Quality Index' : '대기질 지수'}</p>
                  <p className="aqiDescript">{checked ? getAQIenglish[getAQIDescription(airweather.list[0].main.aqi)] : getAQIDescription(airweather.list[0].main.aqi)}</p>

                  {/* 미세먼지들 */}
                  <ul className="dusts">
                     <li className="pm2_5">
                        <p className="dustsTitle">{checked ? 'Ultrafine dust' : '초미세먼지'}</p>
                        <p style={{ fontSize: '38px', margin: '10px 0 ' }}>{getpm2_5DescriptionWithHeart(airweather.list[0].components.pm2_5.toFixed(1))}</p>
                        <p>{checked ? getAQIenglish[getpm2_5Description(airweather.list[0].components.pm2_5.toFixed(1))] : getpm2_5Description(airweather.list[0].components.pm2_5.toFixed(1))}</p>
                        <p className="dustNumb">{airweather.list[0].components.pm2_5.toFixed(1)}µg/m³</p>
                     </li>
                     {/* <li className="line2">|</li> */}
                     <li className="pm10">
                        <p className="dustsTitle">{checked ? 'Fine dust' : '미세먼지'}</p>
                        <p style={{ fontSize: '38px', margin: '10px 0 ' }}>{getpm10DescriptionWithHeart(airweather.list[0].components.pm10.toFixed(1))}</p>
                        <p>{checked ? getAQIenglish[getpm10Description(airweather.list[0].components.pm10.toFixed(1))] : getpm10Description(airweather.list[0].components.pm10.toFixed(1))}</p>
                        <p className="dustNumb">{airweather.list[0].components.pm10.toFixed(1)}µg/m³</p>
                     </li>
                  </ul>
               </div>
            </div>
         )}
      </>
   )
}
export default AirPollution
