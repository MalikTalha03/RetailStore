import React from 'react'
import './css/register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div>
      <div className='reg'>
          <h1>Register</h1>
          <form>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="password" name="password" />
              <button type="submit" onClick={register}>Register</button>
          </form>
          <p>Already have an account?
              <Link to='/login'> Login</Link>
          </p>
      </div>
      </div>
  )
}

export default Register