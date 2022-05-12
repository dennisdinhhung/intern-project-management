import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { db } from '../../utils/firebase-config';

import '../../static/css/OutletCommonChild.scss'
import Context from '../../context/context';

import { BsFillPencilFill, BsFillTrashFill, BsPlusLg } from 'react-icons/bs'
import { setMngEmployee, setMngEmployeeData } from '../../reducer/action';

function MngEmployee() {
  const [state, dispatch] = useContext(Context);

  const [checkboxList, setCheckboxList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [errorEdit, setErrorEdit] = useState();

  const { mngEmployeeData } = state

  const getMngEmployee = useCallback(async () => {
    const mngEmployeeCollectionRef = collection(db, "Employee");
    const data = await getDocs(mngEmployeeCollectionRef);
    const mngEmployeeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(setMngEmployeeData(mngEmployeeData))
  }, [dispatch])

  useEffect(() => {
    getMngEmployee()
  }, [getMngEmployee])

  const afterChanges = () => {
    getMngEmployee()
  }

  const redirect = useNavigate();

  const handleCheckAll = () => {
    // gather all id of the table
    // add id into a list
    // have the checkbox check if the its id is in the list
    //if yes, checked
    //if not, unchecked

    if (!isCheckAll) {

      const newList = [];

      mngEmployeeData.map((item) => (
        newList.push(item.id)
      ))

      setIsCheckAll(true)
      setCheckboxList(newList)
    }
    else {
      setIsCheckAll(false)

      const newList = []
      setCheckboxList(newList)
    }
  }

  const handleCheckbox = (id) => {
    //check if the id is in the list
    const isChecked = checkboxList.includes(id);
    const checkboxListUpdate = isChecked ? checkboxList.filter(item => item !== id) : [...checkboxList, id]
    setCheckboxList(checkboxListUpdate)

    //! bug here
    // if (mngEmployeeData.length === checkboxList.length){
    //     setIsCheckAll(true)
    //     console.log(isCheckAll, 1)
    // }
    // else if (mngEmployeeData.length !== checkboxList.length || checkboxList.length === 0){
    //     setIsCheckAll(false)
    //     console.log(isCheckAll, 2)
    // }
  }

  const handleAdd = () => {
    //set value of add page to empty
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

    redirect('add')
  }

  const handleEdit = () => {

    //gather the selected id

    if (checkboxList.length === 1) {
      const selectedID = checkboxList[0];
      const row = mngEmployeeData.filter(item => item.id === selectedID)
      console.log(row[0])
      dispatch(setMngEmployee(row[0]))
      redirect('edit')
    }
    else {
      setErrorEdit('You can only edit one thing at a time')
      return
    }
  }

  const handleDelete = () => {
    //delete all entry that was selected

    const delList = checkboxList;

    delList.forEach((id) => {
      const itemDoc = doc(db, 'Employee', id);
      deleteDoc(itemDoc)
    })

    afterChanges()
  }

  return (
    <div className='Common'>
      <div className="title">
        Manage Employee
      </div>

      <div className='div-btn-add'>
        <button
          className='button btn-add'
          onClick={handleAdd}>
          <BsPlusLg className='icon' />
          Add
        </button>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                value={isCheckAll}
                onClick={handleCheckAll} />

            </th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>ID Number</th>
            <th>Project Participated</th>
            <th>Tech Stack</th>
          </tr>
        </thead>

        <tbody>
          {
            mngEmployeeData.map((row, index) => (
              <tr key={index}>
                <td className='checkbox'>
                  <input
                    type="checkbox"
                    value={row.id}
                    checked={checkboxList.includes(row.id)}
                    onChange={() => handleCheckbox(row.id)}
                  />
                </td>
                <td>{row.personal_info.name}</td>
                <td>{row.personal_info.dob}</td>
                <td>{row.personal_info.phone}</td>
                <td>{row.personal_id}</td>
                <td>{row.project_participated.map((item) => (
                  <div key={item}>{item}</div>
                ))}</td>
                <td>
                  {row.techstack_info.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="error">
        {errorEdit}
      </div>

      <div className="div-btns">
        <div>
          <button
            className='button blue-btn'
            onClick={handleEdit}>
            <BsFillPencilFill className='icon' />
            Edit
          </button>
        </div>

        <div>
          <button
            className='button blue-btn'
            onClick={handleDelete}>
            <BsFillTrashFill className='icon' />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default MngEmployee