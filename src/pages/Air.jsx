import React, { useState, useCallback } from 'react'
import '../styles/common.css'
import AirPollution from '../components/Airpollution'
import Gnb from '../components/Gnb'
import Footer from '../components/Footer'
import { Wrap, Main } from '../styles/StyledComponent'
// https://mui.com/material-ui/react-toggle-button/#color

function Air() {
   return (
      <>
         <Wrap>
            <Main>
               <Gnb />
               <AirPollution />
            </Main>
         </Wrap>
         <Footer />
      </>
   )
}

export default Air
