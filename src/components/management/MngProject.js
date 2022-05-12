import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { db } from '../../utils/firebase-config';

import '../../static/css/OutletCommonChild.scss'
import Context from '../../context/context';

import { BsFillPencilFill, BsFillTrashFill, BsPlusLg } from 'react-icons/bs'
import { setMngProject, setMngProjectData } from '../../reducer/action';

function MngProject() {
  const [state, dispatch] = useContext(Context);

  const [checkboxList, setCheckboxList] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [errorEdit, setErrorEdit] = useState();

  const { mngProjectData } = state

  const getMngProject = useCallback(async () => {
    const CollectionRef = collection(db, "Project");
    const data = await getDocs(CollectionRef);
    const Data = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    dispatch(setMngProjectData(Data))
  }, [dispatch])

  useEffect(() => {
    getMngProject()
  }, [getMngProject])

  const afterChanges = () => {
    getMngProject()
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

      mngProjectData.map((item) => (
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
    // if (mngProjectData.length === checkboxList.length){
    //     setIsCheckAll(true)
    //     console.log(isCheckAll, 1)
    // }
    // else if (mngProjectData.length !== checkboxList.length || checkboxList.length === 0){
    //     setIsCheckAll(false)
    //     console.log(isCheckAll, 2)
    // }
  }

  const handleEdit = () => {

    //gather the selected id

    if (checkboxList.length === 1) {
      const selectedID = checkboxList[0];
      const row = mngProjectData.filter(item => item.id === selectedID)
      console.log(row[0])
      dispatch(setMngProject(row[0]))
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
      const itemDoc = doc(db, 'Project', id);
      deleteDoc(itemDoc)
    })

    afterChanges()
  }

  return (
    <div className='Common'>
      <div className="title">
        Manage Project
      </div>

      <div className='div-btn-add'>
        <button
          className='button btn-add'
          onClick={() => {
            redirect('add')
          }}>
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
            <th>Status</th>
            <th>Type</th>
            <th>Tech Stack</th>
            <th>Department</th>
            <th>Members</th>
            <th>Customer</th>
          </tr>
        </thead>

        <tbody>
          {console.log(mngProjectData, 1)}
          {
            mngProjectData.map((row, index) => (
              <tr key={index}>
                <td className='checkbox'>
                  <input
                    type="checkbox"
                    value={row.id}
                    checked={checkboxList.includes(row.id)}
                    onChange={() => handleCheckbox(row.id)}
                  />
                </td>
                <td>{row.name}</td>
                <td>{row.status}</td>
                <td>{row.type}</td>
                <td>{row.techstack.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </td>
                <td>{row.department}</td>
                <td>{row.members.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </td>
                <td>{row.customer}</td>
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

export default MngProject