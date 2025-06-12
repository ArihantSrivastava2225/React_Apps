import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between items-center'>
        <p>
          <NavLink to='/'>StoreIt</NavLink>
        </p>
        <ul className='flex justify-center items-center'>
            <li><NavLink to='/signin'>Get Started</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
