import React from 'react'
import firebase from 'firebase/app'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Menu from './Menu'
import PrjType from './category/PrjType'
import PrjStatus from './category/PrjStatus'
import PrjTechStack from './category/PrjTechStack'
import CustomerGroup from './category/CustomerGroup'
import MngEmployee from './management/MngEmployee'
import MngDepartment from './management/MngDepartment'
import MngProject from './management/MngProject'
import NavBar from './NavBar'
import OutLetContainer from '../OutLetContainer'
import Home from './Home'

function Container() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={
          <>
            <NavBar/>
            <OutLetContainer/>
          </>
        }>
          <Route index element={<Home/>}/>
          <Route path='project-type' element={<PrjType/>}/>
          <Route path='project-status' element={<PrjStatus/>}/>
          <Route path='project-techstack' element={<PrjTechStack/>}/>
          <Route path='customer-group' element={<CustomerGroup/>}/>

          <Route path='manage-department' element={<MngDepartment/>}/>
          <Route path='manage-employee' element={<MngEmployee/>}/>
          <Route path='manage-project' element={<MngProject/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Container