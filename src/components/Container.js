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
import EditPrjStatus from './edit_category/EditPrjStatus'
import EditCustomerGroup from './edit_category/EditCustomerGroup'
import AddDepartment from './add_manage/AddDepartment'
import AddEmployee from './add_manage/AddEmployee'
import EditEmployee from './edit_manage/EditEmployee'
import EditDepartment from './edit_manage/EditDepartment'
import AddProject from './add_manage/AddProject'
import EditProject from './edit_manage/EditProject'
import Profile from '../context/Profile'

function Container() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* //TODO: change routing for login and home  
          */}
          <Route path='/' element={<Login />} />
          <Route path='/home' element={
            <RequireAuth>
              <NavBar />
              <OutLetContainer />
            </RequireAuth>
          }>
            <Route index element={<Home />} />

            <Route path='profile' element={<Profile/>}/>

            {//* PROJECT-TYPE
            }
            <Route path='project-type' element={<PrjType />} />

            <Route path='project-type/add' element={<AddPrjType />} />

            <Route path='project-type/edit' element={<EditPrjType />} />


            {//* PROJECT-STATUS
            }
            <Route path='project-status' element={<PrjStatus />} />

            <Route path='project-status/add' element={<AddPrjStatus />} />

            <Route path='project-status/edit' element={<EditPrjStatus />} />

            {//* TECH-STACK
            }
            <Route path='techstack' element={<PrjTechStack />} />
            <Route path='techstack/add' element={<AddTechStack />} />
            <Route path='techstack/edit' element={<EditTechStack />} />

            {//* CUSTOMER-GROUP
            }
            <Route path='customer-group' element={<CustomerGroup />} />
            <Route path='customer-group/add' element={<AddCustomerGroup />} />
            <Route path='customer-group/edit' element={<EditCustomerGroup />} />

            {//* MANAGEMENT-DEP
            }

            <Route path='manage-department' element={<MngDepartment />} />
            <Route path='manage-department/add' element={<AddDepartment />} />
            <Route path='manage-department/edit' element={<EditDepartment />}/>

            {//* MANAGEMENT-EMP
            }
            <Route path='manage-employee' element={<MngEmployee />} />
            <Route path='manage-employee/add' element={<AddEmployee />} />
            <Route path='manage-employee/edit' element={<EditEmployee />}/>

            {//* MANAGEMENT-PRJ
            }
            <Route path='manage-project' element={<MngProject />} />
            <Route path='manage-project/add' element={<AddProject/>}/>
            <Route path='manage-project/edit' element={<EditProject/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default Container