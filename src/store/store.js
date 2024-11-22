import { configureStore } from '@reduxjs/toolkit'
import nowweatherReducer from '../features/currentSlice'
import threeweatherReducer from '../features/threehourSlice'
import airweatherReducer from '../features/airSlice'

const store = configureStore({
   reducer: {
      nowweather: nowweatherReducer,
      //slice 파일에서 name으로 지정한것 : 리듀서
      //리듀서 자리에는 리듀서가 와야함
      //=> slice파일에서 .reducer로 export 하지 않았을 경우 여기서 .reducer 붙여줘야함
      threeweather: threeweatherReducer,
      airweather: airweatherReducer,
   },
})

export default store
