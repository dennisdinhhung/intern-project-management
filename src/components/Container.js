import React, { useContext, useState } from 'react'
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
import EditPrjType from './edit_category/EditPrjType'
import { AuthProvider } from '../utils/AuthProvider'
import { RequireAuth } from '../utils/RequireAuth'
import { useEffect } from 'react'
import { setPrjStatusData, setPrjTypeData } from '../reducer/action'
import EditPrjStatus from './edit_category/EditPrjStatus'
import Context from '../context/context'
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../utils/firebase-config"

function Container() {

  const [state, dispatch] = useContext(Context);
  const { prjTypeState, prjStatusState } = state

  //common
  useEffect(() => {
    getPrjType();
    getPrjStatus()
  }, [])

  const getPrjType = async () => {
    const prjtypeCollectionRef = collection(db, "PrjType");
    const data = await getDocs(prjtypeCollectionRef);
    const prjTypeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dispatch(setPrjTypeData(prjTypeData))
  }

  const getPrjStatus = async () => {
    const prjstatusCollectionRef = collection(db, "PrjStatus");
    const data = await getDocs(prjstatusCollectionRef);
    const prjStatusData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    dispatch(setPrjStatusData(prjStatusData))
  }

  //common
  const afterChangesPrjType = () => {
    getPrjType();
  }

  const afterChangesPrjStatus = () => {
    getPrjStatus()
  }

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

            {//* PROJECT-TYPE
            }
            <Route path='project-type' element={
              <PrjType
                afterChanges={afterChangesPrjType} />} />

            <Route path='project-type/add' element={
              <AddPrjType
                afterChanges={afterChangesPrjType} />} />

            <Route path='project-type/edit' element={
              <EditPrjType
                afterChanges={afterChangesPrjType} />} />


            {//* PROJECT-STATUS
            }
            <Route path='project-status' element={
              <PrjStatus
                afterChanges={afterChangesPrjStatus} />} />

            <Route path='project-status/add' element={
              <AddPrjStatus
                afterChanges={afterChangesPrjStatus} />} />

            <Route path='project-status/edit' element={
              <EditPrjStatus
                afterChanges={afterChangesPrjStatus} />
            } />

            <Route path='project-techstack' element={<PrjTechStack />} />
            <Route path='customer-group' element={<CustomerGroup />} />

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