import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getNowWeather } from '../api/simplewApi'

//createAsyncThunk
//Redux Toolkit에서 비동기 작업을 처리하기 위한 강력한 도구
//비동기 작업(예: API 호출)의 시작, 성공, 실패 상태를 자동으로 관리하고, 이를 Redux 상태에 쉽게 반영할 수 있음.

// 현재 날씨 가져오는 비동기 액션
export const fetchNowWeather = createAsyncThunk('nowweather/fetchNowWeather', async (q) => {
   const response = await getNowWeather(q)
   if (!response.data || !response.data.name) {
      throw new Error('지역을 찾을 수 없습니다.')
   }
   return response.data
})

const currentSlice = createSlice({
   name: 'nowweather',
   initialState: {
      loading: false, // 로딩 여부 상태
      nowweather: null, // 현재 날씨 데이터를 저장할 상태
      error: null, // 에러 메시지 상태
   },
   reducers: {
      resetWeathers(state) {
         state.nowweather = null // nowweather 상태 초기화
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchNowWeather.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchNowWeather.fulfilled, (state, action) => {
            state.loading = false
            state.nowweather = action.payload // 응답 데이터를 nowweather 상태에 저장
         })
         .addCase(fetchNowWeather.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
      //체이닝 방식
   },
})

export const { resetWeathers } = currentSlice.actions
export default currentSlice.reducer
