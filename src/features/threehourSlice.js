//3시간 마다 한번씩 바뀌는 5일치 날씨예보
//https://api.openweathermap.org/data/2.5/forecast?q=incheon&appid=01252e208ef90ff4d1a0291867d80276&units=metric&lang=kr

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getThreeWeather } from '../api/simplewApi'

// 현재 날씨 가져오는 비동기 액션
export const fetchThreeWeather = createAsyncThunk('threeweather/fetchThreeWeather', async (q) => {
   const response = await getThreeWeather(q)
   return response.data
})

const threeWeatherSlice = createSlice({
   name: 'threeweather',
   initialState: {
      loading: false,
      threeweather: null,
      error: null,
   },
   reducers: {
      resetWeathers(state) {
         state.threeweather = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchThreeWeather.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchThreeWeather.fulfilled, (state, action) => {
            state.loading = false
            state.threeweather = action.payload
         })
         .addCase(fetchThreeWeather.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
         })
   },
})

export const { resetWeathers } = threeWeatherSlice.actions
export default threeWeatherSlice.reducer
