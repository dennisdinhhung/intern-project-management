import React from 'react'
import '../../static/css/OutletCommonChild.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import Context from '../../context/context';
import { deleteDoc, doc } from 'firebase/firestore';
import { setTechStack } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

import { BsFillPencilFill, BsFillTrashFill, BsPlusLg } from 'react-icons/bs'

function PrjTechStack({ afterChanges }) {

    const [state, dispatch] = useContext(Context);

    const [checkboxList, setCheckboxList] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [errorEdit, setErrorEdit] = useState();

    const { techStackData } = state

    const redirect = useNavigate();

    const handleCheckAll = () => {
        // gather all id of the table
        // add id into a list
        // have the checkbox check if the its id is in the list
        //if yes, checked
        //if not, unchecked

        if (!isCheckAll) {

            const newList = [];

            techStackData.map((item) => (
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
        // if (techStackData.length === checkboxList.length){
        //     setIsCheckAll(true)
        //     console.log(isCheckAll, 1)
        // }
        // else if (techStackData.length !== checkboxList.length || checkboxList.length === 0){
        //     setIsCheckAll(false)
        //     console.log(isCheckAll, 2)
        // }
    }

    const handleEdit = () => {

        //gather the selected id

        if (checkboxList.length === 1) {
            const selectedID = checkboxList[0];
            const row = techStackData.filter(item => item.id === selectedID)
            dispatch(setTechStack(row[0]))
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
            const itemDoc = doc(db, 'TechStack', id);
            deleteDoc(itemDoc)
        })

        afterChanges()
    }

    const statusClass = (info) => {
        if (info === 'ACTIVE') {
            return 'active'
        }
        else if (info === 'INACTIVE') {
            return 'inactive'
        }
    }

    return (
        <div className='ProjectType Common'>
            <div className="title">
                Tech Stack
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
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        techStackData.map((row, index) => (
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
                                <td>{row.description}</td>
                                <td>
                                    <div className={`status ${statusClass(row.status)}`}>
                                        {row.status}
                                    </div>
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

export default PrjTechStack