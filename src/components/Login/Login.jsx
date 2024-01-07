import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'




const Login = () => {
  const apiurl = "http://localhost:3001/auth/login"
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username')
    const password = data.get('password')
    const user = {
      username,
      password
    }
    fetch (
      apiurl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    )
    .then(res => res.json())
    .then(data => {
      if (data.message === 'Login Successful') {
        window.location.href = '/neworder'
        localStorage.setItem('token', data.token)
      }
      else {
        alert(data.message)
      }
    })
    .catch(err => {
      console.log(err)
    })

  }
  return (
    <div>
      <div className='login'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
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