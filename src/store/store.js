import { configureStore } from '@reduxjs/toolkit'
import nowweatherReducer from '../features/currentSlice'
import threeweatherReducer from '../features/threehourSlice'
//import moviesReducer from '../features/movies/moviesSlice'
//import tvsReducer from '../features/tvs/tvsSlice'

const store = configureStore({
   reducer: {
      nowweather: nowweatherReducer,
      threeweather: threeweatherReducer,
      //movies: moviesReducer,
      //tvs: tvsReducer,
   },
})

export default store
