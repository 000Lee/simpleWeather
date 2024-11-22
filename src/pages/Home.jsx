import React, { useState, useCallback } from 'react'
import '../styles/common.css'
import Weather from '../components/Weather'
import Gnb from '../components/Gnb'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
// https://mui.com/material-ui/react-toggle-button/#color

function Home() {
   return (
      <>
         <Wrap>
            <Main>
               <Gnb />
               <Weather />
            </Main>
         </Wrap>
         <Footer />
      </>
   )
}
//Footer 배경색 화면에 꽉 차게 하려고 컴포넌트 wrap 바깥에 위치
export default Home
