import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { db } from '../../utils/firebase-config';

import '../../static/css/OutletCommonChild.scss'
import Context from '../../context/context';
import { setCustomerGroup, setCustomerGroupData } from '../../reducer/action';

import { BsFillPencilFill, BsFillTrashFill, BsPlusLg } from 'react-icons/bs'

function CustomerGroup() {

    const [state, dispatch] = useContext(Context);

    const [checkboxList, setCheckboxList] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [errorEdit, setErrorEdit] = useState();

    const { customerGroupData } = state

    const getCustomerGroup = useCallback(async () => {
        const customerGroupCollectionRef = collection(db, "CustomerGroup");
        const data = await getDocs(customerGroupCollectionRef);
        const customerGroupData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setCustomerGroupData(customerGroupData))
    }, [dispatch])

    useEffect(() => {
        getCustomerGroup()
    }, [getCustomerGroup])

    const afterChanges = () => {
        getCustomerGroup()
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

            customerGroupData.map((item) => (
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



    const handleCheckbox = async (id) => {
        //check if the id is in the list
        const isChecked = checkboxList.includes(id);
        const checkboxListUpdate = isChecked ? checkboxList.filter(item => item !== id) : [...checkboxList, id]
        setCheckboxList(checkboxListUpdate)

        if (customerGroupData.length === checkboxListUpdate.length) {
            setIsCheckAll(true)
        }
        else if (customerGroupData.length !== checkboxListUpdate.length || checkboxListUpdate.length === 0) {
            setIsCheckAll(false)
        }
    }

    const handleEdit = () => {

        //gather the selected id

        if (checkboxList.length === 1) {
            const selectedID = checkboxList[0];
            const row = customerGroupData.filter(item => item.id === selectedID)
            console.log(row[0])
            dispatch(setCustomerGroup(row[0]))
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
            const itemDoc = doc(db, 'CustomerGroup', id);
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
                Customer Group
            </div>

            <div className='div-btn-add'>
                <button
                    className='button btn-add'
                    onClick={() => {
                        dispatch(setCustomerGroup({
                            name: '',
                            description: '',
                            priority: '',
                            status: ''
                        }))

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
                                checked={isCheckAll}
                                onChange={handleCheckAll} />

                        </th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        customerGroupData.map((row, index) => (
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
                                <td className='center'>{row.priority}</td>
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
                        className={`button ${checkboxList.length === 1 ? 'blue-btn' : 'disabled'}`}
                        onClick={handleEdit}>
                        <BsFillPencilFill className='icon' />
                        Edit
                    </button>
                </div>

                <div>
                    <button
                        className={`button ${checkboxList.length < 1 ? 'disabled' : 'red-btn'}`}
                        onClick={handleDelete}>
                        <BsFillTrashFill className='icon' />
                        Delete{isCheckAll ? ' All' : ''}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerGroup