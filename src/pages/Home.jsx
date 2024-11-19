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

export default Home
