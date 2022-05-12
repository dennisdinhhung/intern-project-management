import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setMngDepartment, setMngDepartmentData, setMngEmployeeData, setTechStackData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

import '../../static/css/CommonAddEdit.scss'

function EditDepartment() {
    
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

        const editDoc = doc(db, 'Department', mngDepartmentState.id)
        const updated = mngDepartmentState
        delete updated.id

        await updateDoc(editDoc, updated)

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

    const handleCheckboxEmployee = (value) => {
        console.log(value, 0)
        const isChecked = mngDepartmentState.employee.includes(value)

        const checkboxListUpdate = isChecked ? mngDepartmentState.employee.filter(item => item !== value) : [...mngDepartmentState.employee, value]
        console.log(checkboxListUpdate, 1)
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
                <div>Name</div>
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

                <div>Function</div>
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

                <div>Tech Stack</div>

                {// TODO: Select from the list of tech stack
                }
                {techStackData.map((item) => {
                    if (item.status === 'ACTIVE') {
                        return (
                            <div key={item.name} >
                                <input
                                    type='checkbox'
                                    value={item.name}
                                    onChange={() => handleCheckboxTech(item.name)}
                                    checked={mngDepartmentState.techstack.includes(item.name)} />
                                <div>{item.name}</div>
                            </div>
                        )
                    }

                    return ''
                })}

                <div>Employee</div>
                {// TODO: Select from the list of employees
                }
                {mngEmployeeData.map((item) => {
                    return (
                        <div key={item.personal_info.name} >
                            <input
                                type='checkbox'
                                value={item.personal_info.name}
                                onChange={() => handleCheckboxEmployee(item.personal_info.name)}
                                checked={mngDepartmentState.employee.includes(item.personal_info.name)} />
                            <div>{item.personal_info.name}</div>
                        </div>
                    )
                })}

                <button
                    className='btn-add'
                    onClick={handleSubmit}>
                    Edit
                </button>
            </form>
        </div>
    )
}

export default EditDepartment