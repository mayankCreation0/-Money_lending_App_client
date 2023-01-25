import React from 'react'
import {Routes,Route} from "react-router-dom"
import Dashboard from '../components/Dashboard'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='dashboard' element={<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>}/>
      </Routes>
    </div>
  )
}
export default AllRoutes
