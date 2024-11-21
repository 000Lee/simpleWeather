import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const AUTH_KEY = process.env.REACT_APP_WEATHER_API_KEY

// axios 인스턴스
const simplewApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      accept: 'application/json',
   },
})

// 공통 API 호출 함수
const fetchFromApi = async (url, params = {}) => {
   try {
      // params에 API 키 추가
      const response = await simplewApi.get(url, {
         params: {
            ...params,
            appid: AUTH_KEY, // OpenWeatherMap에서는 appid 파라미터로 API 키를 받음
         },
      })
      return response
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 현재 날씨 가져오기
export const getNowWeather = (q = 'incheon') => {
   return fetchFromApi(`/weather`, {
      lang: 'kr',
      q,
      units: 'metric',
   })
}

// 3시간마다 바뀌는 5일치 날씨 예보
export const getThreeWeather = (q = 'incheon') => {
   return fetchFromApi(`/forecast`, {
      lang: 'kr',
      q,
      units: 'metric',
   })
}

// 대기 상태 가져오기
export const getAirWeather = async (q = 'incheon') => {
   try {
      // 먼저 현재 날씨 데이터에서 위도와 경도를 가져오기
      const nowWeatherResponse = await getNowWeather(q)
      const { coord } = nowWeatherResponse.data
      //구조분해할당을 사용했기 때문에 coord에 중괄호 씌움

      if (!coord || !coord.lat || !coord.lon) {
         throw new Error('위도와 경도를 가져올 수 없습니다.')
      }

      // 위도와 경도를 사용하여 대기 상태 정보 가져오기
      const airWeatherResponse = await fetchFromApi(`/air_pollution`, {
         lat: coord.lat,
         lon: coord.lon,
      })

      return airWeatherResponse.data // 대기 상태 데이터 반환
   } catch (error) {
      console.error(`대기 상태 요청 오류: ${error.message}`)
      throw error
   }
}

export default simplewApi
