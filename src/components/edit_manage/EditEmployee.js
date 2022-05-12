import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';

import '../../static/css/CommonAddEdit.scss'
import { setMngEmployee, setMngEmployeeData, setTechStackData } from '../../reducer/action';

function EditEmployee() {
    const [state, dispatch] = useContext(Context)

    const { mngEmployeeState, techStackData } = state
  
    const getMngEmployee = useCallback(async () => {
      const mngEmployeeCollectionRef = collection(db, "Employee");
      const data = await getDocs(mngEmployeeCollectionRef);
      const mngEmployeeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      dispatch(setMngEmployeeData(mngEmployeeData))
    }, [dispatch])
  
    const afterChanges = () => {
      getMngEmployee()
    }
  
    const getTechStack = useCallback(async () => {
      const teckStackCollectionRef = collection(db, "TechStack");
      const data = await getDocs(teckStackCollectionRef);
      const teckStackData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
      dispatch(setTechStackData(teckStackData))
    }, [dispatch])
  
    //TODO: add loading screen while waiting for getDocs and dispatch to finish
  
    useEffect(() => {
      getTechStack()
    }, [getTechStack])
  
    const redirect = useNavigate();
  
    // const mngEmployeeCollectionRef = collection(db, "Employee");
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      const editDoc = doc(db, 'Employee', mngEmployeeState.id)
      const updated = mngEmployeeState
      delete updated.id
  
      await updateDoc(editDoc, updated)
  
      dispatch(setMngEmployee({
        personal_id: '',
        personal_info: {
          name: '',
          dob: '',
          phone: ''
        },
        project_participated: [],
        techstack_info: []
      }))
  
      afterChanges()
  
      redirect('/home/manage-employee')
    }
  
    const handleCheckbox = (value) => {
      const isChecked = mngEmployeeState.techstack_info.includes(value)
  
      const checkboxListUpdate = isChecked ? mngEmployeeState.techstack_info.filter(item => item !== value) : [...mngEmployeeState.techstack_info, value]
  
      dispatch(setMngEmployee({
        ...mngEmployeeState,
        techstack_info: checkboxListUpdate
      }))
    }
  
    return (
      <div className='CommonAddEdit'>
        <div className="title">
          Edit Employee
        </div>
        <form action="">
          <div>Name</div>
          <input
            type="text"
            className='input'
            value={mngEmployeeState.personal_info.name}
            onChange={(e) => {
              dispatch(
                setMngEmployee({
                  ...mngEmployeeState,
                  personal_info: { 
                      ...mngEmployeeState.personal_info, 
                      name: e.target.value }
                }))
            }} />
  
          <div>Date of Birth</div>
          <input
            type="date"
            className='input'
            value={mngEmployeeState.personal_info.dob}
            onChange={(e) => {
              dispatch(
                setMngEmployee({
                  ...mngEmployeeState,
                  personal_info: { 
                    ...mngEmployeeState.personal_info,
                    dob: e.target.value }
                }))
            }} />
          <div>Phone Number</div>
          <input
            type='text'
            className='input'
            value={mngEmployeeState.personal_info.phone}
            onChange={(e) => {
              dispatch(
                setMngEmployee({
                  ...mngEmployeeState,
                  personal_info: { 
                    ...mngEmployeeState.personal_info,
                    phone: e.target.value }
                }))
            }} />
  
  
          <div>Tech Stack</div>
          {techStackData.map((item) => {
              if (item.status === 'ACTIVE') {
                return (
                <div key={item.name} >
                  <input 
                    type='checkbox' 
                    value={item.name}
                    onChange={() => handleCheckbox(item.name)}
                    checked={mngEmployeeState.techstack_info.includes(item.name)}/>
                  <div>{item.name}</div>
                </div>
                )
              }
  
              return ''
            })}
  
          <button
            className='btn-add-prj'
            onClick={handleSubmit}>
            Edit
          </button>
        </form>
      </div>
    )
}

export default EditEmployee