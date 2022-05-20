import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';

import '../../static/css/CommonAddEdit.scss'
import { setMngEmployee, setMngEmployeeData, setTechStackData } from '../../reducer/action';
import Validate from '../Validate';

function AddEmployee() {
  const [state, dispatch] = useContext(Context)

  const [error, setError] = useState({})

  const { mngEmployeeState, mngEmployeeData, techStackData } = state

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

  const mngEmployeeCollectionRef = collection(db, "Employee");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = Validate(mngEmployeeState);

    if (Object.values(validation).some(item => item)) {
      setError(validation);
      return;
    }

    //find the largest id in the array
    let lastEntry = 0
    mngEmployeeData.forEach((item) => {
      if (item.personal_id > lastEntry) {
        lastEntry = item.personal_id
      }
    })

    lastEntry++
    await addDoc(mngEmployeeCollectionRef, { ...mngEmployeeState, personal_id: lastEntry })

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
        Add Employee
      </div>
      
      <form action="">
        <div className='input-title'>Name</div>
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
                  name: e.target.value
                }
              }))
          }}
        />

<div className="error">{error.personal_info?.name}</div>

        <div className='input-title'>Date of Birth</div>
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
                  dob: e.target.value
                }
              }))
          }}
        />

<div className="error">{error.personal_info?.dob}</div>

        <div className='input-title'>Phone Number</div>
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
                  phone: e.target.value
                }
              }))
          }}
        />

<div className="error">{error.personal_info?.phone}</div>

        <div className='input-title'>Tech Stack</div>
        <div className="div-input-checkbox-section">
          {techStackData.map((item) => {
            if (item.status === 'ACTIVE') {
              return (
                <div key={item.name} >
                  <input
                    type='checkbox'
                    className='input-checkbox'
                    value={item.name}
                    onChange={() => handleCheckbox(item.name)}
                    checked={mngEmployeeState.techstack_info.includes(item.name)} />
                  <div>{item.name}</div>
                </div>
              )
            }

            return ''
          })}
        </div>

<div className="error">{error.techstack_info}</div>

        <button
          className='btn-add-edit'
          onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  )
}

export default AddEmployee