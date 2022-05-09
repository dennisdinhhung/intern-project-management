import React, { useCallback, useContext } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Login'
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
import EditTechStack from './edit_category/EditTechStack'
import { AuthProvider } from '../utils/AuthProvider'
import { RequireAuth } from '../utils/RequireAuth'
import { useEffect } from 'react'
import { setCustomerGroupData, setPrjStatusData, setPrjTypeData, setTechStackData } from '../reducer/action'
import EditPrjStatus from './edit_category/EditPrjStatus'
import Context from '../context/context'
import { collection, getDocs } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import EditCustomerGroup from './edit_category/EditCustomerGroup'

function Container() {

  const [state, dispatch] = useContext(Context);

  const getPrjType = useCallback(async () => {
    const prjtypeCollectionRef = collection(db, "PrjType");
    const data = await getDocs(prjtypeCollectionRef);
    const prjTypeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    dispatch(setPrjTypeData(prjTypeData))
  }, [dispatch])

  const getPrjStatus = useCallback(async () => {
    const prjstatusCollectionRef = collection(db, "PrjStatus");
    const data = await getDocs(prjstatusCollectionRef);
    const prjStatusData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    dispatch(setPrjStatusData(prjStatusData))
  }, [dispatch])

  const getTechStack = useCallback(async () => {
    const teckStackCollectionRef = collection(db, "TechStack");
    const data = await getDocs(teckStackCollectionRef);
    const teckStackData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    dispatch(setTechStackData(teckStackData))
  }, [dispatch])

  const getCustomerGroup = useCallback(async () => {
    const customerGroupCollectionRef = collection(db, "CustomerGroup");
    const data = await getDocs(customerGroupCollectionRef);
    const customerGroupData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    
    dispatch(setCustomerGroupData(customerGroupData))
  }, [dispatch])

  //common
  useEffect(() => {
    getPrjType();
    getPrjStatus();
    getTechStack();
    getCustomerGroup();
  }, [getPrjType, getPrjStatus, getTechStack, getCustomerGroup])


  //common
  const afterChangesPrjType = () => {
    getPrjType();
  }

  const afterChangesPrjStatus = () => {
    getPrjStatus()
  }

  const afterChangesTechStack = () => {
    getTechStack()
  }

  const afterChangesCustomer = () => {
    getCustomerGroup()
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

            {//* TECH-STACK
            }
            <Route path='techstack' element={
              <PrjTechStack 
              afterChanges={afterChangesTechStack}/>} />
            <Route path='techstack/add' element={
              <AddTechStack 
                afterChanges={afterChangesTechStack}/>} />
            <Route path='techstack/edit' element={
              <EditTechStack
                afterChanges={afterChangesTechStack}/>
            }/>

            {//* CUSTOMER-GROUP
            }
            <Route path='customer-group' element={
              <CustomerGroup 
                afterChanges={afterChangesCustomer}/>} />
            <Route path='customer-group/add' element={
              <AddCustomerGroup 
                afterChanges={afterChangesCustomer}/>} />
            <Route path='customer-group/edit' element={
              <EditCustomerGroup
                afterChanges={afterChangesCustomer}/>
            }/>



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