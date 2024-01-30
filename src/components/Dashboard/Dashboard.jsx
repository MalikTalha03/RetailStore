import React from 'react'
import checkToken from '../loggedin';

const Dashboard = () => {
  checkToken();
  return (
    <div>
        <h1>Dashboard</h1>


    </div>
  )
}

export default Dashboard