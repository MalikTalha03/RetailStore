import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'


const Login = () => {
  return (
    <div>
      <div className='login'>
          <h1>Login</h1>
          <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
              <button type="submit" >Login</button>
          </form>
          <p>Don't have an Account yet? 
              <Link to='/signup'> Sign Up</Link>
          </p>
      </div>
    </div>
  )
}

export default Login