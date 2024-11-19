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
               <li style={{ float: 'right', width: '70px' }}>
                  <NavLink to="/Air" className={({ isActive }) => (isActive ? 'active' : '')}>
                     air
                  </NavLink>
               </li>
               <li style={{ float: 'right', width: '70px' }}>
                  <NavLink to="/Days" className={({ isActive }) => (isActive ? 'active' : '')}>
                     days
                  </NavLink>
               </li>
               <li style={{ float: 'right', width: '70px' }}>
                  <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                     now
                  </NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Gnb
// className={({ isActive }) => (isActive ? 'active' : '')}
