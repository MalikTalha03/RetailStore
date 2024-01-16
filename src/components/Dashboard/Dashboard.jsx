import React from 'react'
import checkToken from './components/loggedin';

const Dashboard = () => {
  checkToken();
  return (
    <div>
        <h1>Dashboard</h1>


    </div>
  )
}

export default Dashboard