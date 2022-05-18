import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setMngDepartment, setMngDepartmentData, setMngEmployeeData, setTechStackData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

import '../../static/css/CommonAddEdit.scss'

function AddDepartment() {

    const [state, dispatch] = useContext(Context)

    const { mngDepartmentState, techStackData, mngEmployeeData } = state

    const getMngDepartment = useCallback(async () => {
        const mngDepartmentCollectionRef = collection(db, "Department");
        const data = await getDocs(mngDepartmentCollectionRef);
        const mngDepartmentData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setMngDepartmentData(mngDepartmentData))
    }, [dispatch])

    const afterChanges = () => {
        getMngDepartment()
    }

    const getTechStack = useCallback(async () => {
        const teckStackCollectionRef = collection(db, "TechStack");
        const data = await getDocs(teckStackCollectionRef);
        const teckStackData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setTechStackData(teckStackData))
    }, [dispatch])

    const getMngEmployee = useCallback(async () => {
        const mngEmployeeCollectionRef = collection(db, "Employee");
        const data = await getDocs(mngEmployeeCollectionRef);
        const mngEmployeeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setMngEmployeeData(mngEmployeeData))
    }, [dispatch])

    useEffect(() => {
        getTechStack()
        getMngEmployee()
    }, [getTechStack, getMngEmployee])

    const redirect = useNavigate();

    const CollectionRef = collection(db, "Department");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(CollectionRef, mngDepartmentState)

        dispatch(setMngDepartment({
            name: '',
            function: '',
            employee: [],
            project: [],
            techstack: []
        }))

        afterChanges()

        redirect('/home/manage-department')
    }

    const handleCheckboxTech = (value) => {
        const isChecked = mngDepartmentState.techstack.includes(value)

        const checkboxListUpdate = isChecked ? mngDepartmentState.techstack.filter(item => item !== value) : [...mngDepartmentState.techstack, value]

        dispatch(setMngDepartment({
            ...mngDepartmentState,
            techstack: checkboxListUpdate
        }))
    }

    const handleCheckboxEmployee = (name, id) => {
        const isChecked = mngDepartmentState.employee.some(info => info.personal_id === id)

        const checkboxListUpdate = isChecked ? mngDepartmentState.employee.filter(item => item.personal_id !== id) : [...mngDepartmentState.employee, {name: name, personal_id: id}]
        dispatch(setMngDepartment({
            ...mngDepartmentState,
            employee: checkboxListUpdate
        }))
    }


    //TODO: choose from list of tech stack and employee

    return (
        <div className='CommonAddEdit'>
            <div className="title">
                Add Department
            </div>

            <form action="">
                <div className='input-title'>Name</div>
                <input
                    type="text"
                    className='input'
                    value={mngDepartmentState.name}
                    onChange={(e) => {
                        dispatch(
                            setMngDepartment({
                                ...mngDepartmentState,
                                name: e.target.value
                            }))
                    }} />

                <div className='input-title'>Function</div>
                <input
                    type="text"
                    className='input'
                    value={mngDepartmentState.function}
                    onChange={(e) => {
                        dispatch(
                            setMngDepartment({
                                ...mngDepartmentState,
                                function: e.target.value
                            }))
                    }} />

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
                                        onChange={() => handleCheckboxTech(item.name)}
                                        checked={mngDepartmentState.techstack.includes(item.name)} />
                                    <div>{item.name}</div>
                                </div>
                            )
                        }

                        return ''
                    })}
                </div>

                <div className='input-title'>Employee</div>

                {/* {console.log(mngDepartmentState.employee, 0)} */}
                <div className="div-input-checkbox-section">
                    {mngEmployeeData.map((item) => {
                        return (
                            <div key={item.personal_info.name} >
                                <input
                                    type='checkbox'
                                    className='input-checkbox'
                                    value={item.personal_info.name}
                                    onChange={() => handleCheckboxEmployee(item.personal_info.name, item.personal_id)}
                                    checked={mngDepartmentState.employee.some(info => info.personal_id === item.personal_id)} />
                                <div>{item.personal_info.name + ' (id: ' + item.personal_id + ')'}</div>
                            </div>
                        )
                    })}
                </div>

                <button
                    className='btn-add-edit'
                    onClick={handleSubmit}>
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddDepartment