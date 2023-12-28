import React from 'react'
import './css/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav>
            <h1>Sufi Traders</h1>
            <ul>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </ul>
        </nav> 
    </div>
  )
}

export default Navbar