import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAirWeather } from '../api/simplewApi'

// 현재 날씨 가져오는 비동기 액션
export const fetchAirWeather = createAsyncThunk('airweather/fetchAirWeather', async (q) => {
   const response = await getAirWeather(q)
   return response // 대기 상태 데이터를 그대로 반환.

   /* ? */
   //여기서 response.data하면 api에서 안붙여도 되나...?
})

const currentSlice = createSlice({
   name: 'airweather',
   initialState: {
      loading: false, // 로딩 여부 상태
      airweather: null, // 대기 상태 데이터를 저장할 상태
      error: null, // 에러 메시지 상태
   },
   reducers: {
      resetWeathers(state) {
         state.airweather = null // airWeather 상태 초기화
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAirWeather.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchAirWeather.fulfilled, (state, action) => {
            state.loading = false
            state.airweather = action.payload // 응답 데이터를 airweather 상태에 저장
         })
         .addCase(fetchAirWeather.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || '데이터를 가져오는 중 오류가 발생했습니다.'
         })
   },
})

export const { resetWeathers } = currentSlice.actions
export default currentSlice.reducer
