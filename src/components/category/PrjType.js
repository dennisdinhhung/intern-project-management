import React, { useReducer } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

import '../../static/css/OutletCommonChild.scss'

function PrjType({state, parentOnEditClick}) {

    const [checkboxList, setCheckboxList] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [errorEdit, setErrorEdit] = useState();

    const { prjTypeData } = state

    const redirect = useNavigate();

    const handleCheckAll = () => {
        // gather all id of the table
        // add id into a list
        // have the checkbox check if the its id is in the list
            //if yes, checked
            //if not, unchecked
        
        if (!isCheckAll){

            const newList = [];
            
            prjTypeData.map((item) => (
                newList.push(item.id)
            ))

            setIsCheckAll(true)
            setCheckboxList(newList)
        }
        else{
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
        // if (prjTypeData.length === checkboxList.length){
        //     setIsCheckAll(true)
        //     console.log(isCheckAll, 1)
        // }
        // else if (prjTypeData.length !== checkboxList.length || checkboxList.length === 0){
        //     setIsCheckAll(false)
        //     console.log(isCheckAll, 2)
        // }
    }

    const handleEdit = () => {

        //gather the selected id
        
        if (checkboxList.length === 1){
            const selectedID = checkboxList[0];
            const row = prjTypeData.filter(item => item.id === selectedID)
            parentOnEditClick(row[0]);
            redirect('edit')
        }
        else{
            setErrorEdit('You can only edit one thing at a time')
            return
        }
    }

    return (
        <div className='ProjectType Common'>
            <div className="title">
                Project Type
            </div>

            <button
                className='btn-add'
                onClick={() => {
                    redirect('add')
                }}>
                Add
            </button>

            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox"
                                value={isCheckAll}
                                onClick={handleCheckAll}/>
                                
                        </th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        prjTypeData.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <input 
                                        type="checkbox"
                                        value={row.id}
                                        checked={checkboxList.includes(row.id)}
                                        onChange={() => handleCheckbox(row.id)}
                                        />
                                    {
                                        //! testing purposes
                                    }
                                    {row.id}
                                </td>
                                <td>{row.name}</td>
                                <td>{row.description}</td>
                                <td>{row.priority}</td>
                                <td>{row.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            <div className="error">
                {errorEdit}
            </div>

            <div className="div-btns">
                <button
                    onClick={handleEdit}>
                    Edit
                </button>

                <button>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default PrjType