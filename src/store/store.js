import { configureStore } from '@reduxjs/toolkit'
import nowweatherReducer from '../features/currentSlice'
import threeweatherReducer from '../features/threehourSlice'
import airweatherReducer from '../features/airSlice'

const store = configureStore({
   reducer: {
      nowweather: nowweatherReducer,
      threeweather: threeweatherReducer,
      airweather: airweatherReducer,
      //movies: moviesReducer,
      //tvs: tvsReducer,
   },
})

export default store
