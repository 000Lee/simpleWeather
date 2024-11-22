import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
//ReactDOM.createRoot
//React 18에서 나온 "concurrent mode(병렬 처리 모드)"를 지원하기 위해 사용됨
//병렬처리(parallel processing): 컴퓨터가 여러 작업을 동시에 수행하는 것
//직렬 처리(Sequential Processing): 혼자 일하는 사람이 하나의 작업을 끝낸 후 다음 작업을 시작하는 것.
/* 
ex)직렬: 피자 한 판을 혼자 만들고, 구운 뒤, 포장까지 한 사람이 다 하는 경우.
ex)병렬:한 사람은 피자를 만들고, 다른 사람은 구우며, 또 다른 사람은 포장하는 경우. (여러 사람이 각각 맡은 작업을 동시에 처리)  */

//유저 인터페이스(UI)를 렌더링하는 작업 + 백그라운드에서 다른 데이터를 처리하거나 업데이트하는 작업
//-> 한번에 & 동시에 여러 작업 처리
//=> 더 빠르고 부드러운 사용자 경험(UX) 제공
//하나의 작업이 오래 걸려도 다른 작업이 멈추지 않음.

//비동기는 "기다리지 않고" 다음 일을 처리하는 방식이고, 병렬은 실제로 "동시에 실행"하는 방식

/*  */

//document.getElementById('root'): HTML에서 React 앱을 렌더링할 위치를 지정

root.render(
   // <React.StrictMode>
   //<BrowserRouter>는 애플리케이션에서 라우팅 시스템을 동작하게 만드는 핵심 컴포넌트
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>

   // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
