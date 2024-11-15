import './css/Gnb.css'
import { NavLink } from 'react-router-dom'

function Gnb() {
   return (
      <header>
         <nav>
            <ul>
               <li className="logo">
                  <NavLink to="/">Simple Weather</NavLink>
               </li>
               <li style={{ float: 'right' }}>
                  <NavLink to="/Air">air</NavLink>
               </li>
               <li style={{ float: 'right' }}>
                  <NavLink to="/Days">days</NavLink>
               </li>
               <li style={{ float: 'right' }}>
                  <NavLink to="/">now</NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Gnb
