import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Air from './pages/Air'
import Days from './pages/Days'

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Air" element={<Air />} />
         <Route path="/Days" element={<Days />} />
         <Route path="/*" element={<NotFound />} />
      </Routes>
   )
}

export default App
