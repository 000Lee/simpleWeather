import React, { useState, useCallback } from 'react'
import '../styles/common.css'
import Three from '../components/Three'
import Gnb from '../components/Gnb'
import { Wrap, Main } from '../styles/StyledComponent'
// https://mui.com/material-ui/react-toggle-button/#color

function Days() {
   return (
      <Wrap>
         <Main>
            <Gnb />
            <Three />
         </Main>
      </Wrap>
   )
}

export default Days
