import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Air from './pages/Air'
import Days from './pages/Days'

function App() {
   return (
      //path = 경로 설정(링크.
      //ex) air 페이지 접속시 링크에 어쩌구저쩌구 /Air이라고 뜸
      //element = pages 폴더에 있는 컴포넌트들. 각각의 페이지
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Air" element={<Air />} />
         <Route path="/Days" element={<Days />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App
