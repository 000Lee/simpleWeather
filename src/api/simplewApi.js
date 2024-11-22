import axios from 'axios'
// axios: HTTP 요청을 더 쉽고 강력하게 처리. fetch보다 기능이 많고 간단함

const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const AUTH_KEY = process.env.REACT_APP_WEATHER_API_KEY
//.env파일에 키 설정하고 오기

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
      //data 이슈
      //return response 라고 작성 시 -> 대기상태 오류
      //return response.data 라고 작성 시 -> 현재날씨, 5일치날씨 오류
      //=> Axios가 반환하는 응답 객체의 구조 때문

      // Axios로 HTTP 요청을 보내면 반환되는 response 객체가 가지고 있는 구조
      /* 
      {
      data: {},           // 서버에서 실제로 반환한 데이터 (주로 JSON)
      status: 200,        // HTTP 상태 코드
      statusText: "OK",   // 상태 메시지
      headers: {},        // 응답 헤더 정보
      config: {},         // 요청에 사용된 설정 정보
      request: {}         // 원본 요청 객체 (브라우저나 Node.js 환경에 따라 다름)
      }

      ==> 대기상태는 안그래도 공통 api 호출함수로 status 부터 request까지 자질구레한거 다 받았는데
      그 데이터가 중복이 되어서 그런가..? 
 */
   } catch (error) {
      console.error(`API 요청 오류: ${error.message}`)
      throw error
   }
}

// 현재 날씨 가져오기
export const getNowWeather = (q = 'incheon') => {
   //인천을 기본값으로 설정
   return fetchFromApi(`/weather`, {
      // /weather, /forecast, /air_pollution은 api 사이트 주소 형식을 따른 것
      // 공통 api인 뭐시기2.5까지는 다 똑같은데 저기서 부터는 api 종류마다 달랐음

      //https://openweathermap.org/current
      //여기 링크에 매개변수 안내 나와있음. 데이터 불러와야하니까 설정 하라는 대로 써야함
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
