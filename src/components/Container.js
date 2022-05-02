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
import AddPrjType from './add_category/AddPrjType'
import AddPrjStatus from './add_category/AddPrjStatus'
import AddTechStack from './add_category/AddTechStack'
import AddCustomerGroup from './add_category/AddCustomerGroup'
import { AuthProvider } from '../utils/AuthProvider'
import { RequireAuth } from '../utils/RequireAuth'

function Container() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={
            <RequireAuth>
              <NavBar />
              <OutLetContainer />
            </RequireAuth>
          }>
            <Route index element={<Home />} />
            <Route path='project-type' element={<PrjType />} />
            <Route path='project-status' element={<PrjStatus />} />
            <Route path='project-techstack' element={<PrjTechStack />} />
            <Route path='customer-group' element={<CustomerGroup />} />

            <Route path='project-type/add' element={<AddPrjType />} />
            <Route path='project-status/add' element={<AddPrjStatus />} />
            <Route path='project-techstack/add' element={<AddTechStack />} />
            <Route path='customer-group/add' element={<AddCustomerGroup />} />

            <Route path='manage-department' element={<MngDepartment />} />
            <Route path='manage-employee' element={<MngEmployee />} />
            <Route path='manage-project' element={<MngProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Container