import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setCustomerGroupData, setMngDepartmentData, setMngEmployeeData, setMngProject, setMngProjectData, setPrjStatusData, setPrjTypeData, setTechStackData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';
import Validate from '../Validate';

function AddProject() {

    const [state, dispatch] = useContext(Context)

    const [error, setError] = useState({})

    const [employeeList, setEmployeeList] = useState([])

    const { mngProjectState, prjStatusData, prjTypeData, techStackData, customerGroupData, mngDepartmentData } = state

    const redirect = useNavigate()

    const getMngProject = useCallback(async () => {
        const CollectionRef = collection(db, "Project");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setMngProjectData(Datas))
    }, [dispatch])

    const afterChanges = () => {
        getMngProject()
    }

    const getPrjStatus = useCallback(async () => {
        const CollectionRef = collection(db, "PrjStatus");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setPrjStatusData(Datas))
    }, [dispatch])

    const getPrjType = useCallback(async () => {
        const CollectionRef = collection(db, "PrjType");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setPrjTypeData(Datas))
    }, [dispatch])

    const getTechStack = useCallback(async () => {
        const CollectionRef = collection(db, "TechStack");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setTechStackData(Datas))
    }, [dispatch])

    const getCustomer = useCallback(async () => {
        const CollectionRef = collection(db, "CustomerGroup");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setCustomerGroupData(Datas))
    }, [dispatch])

    const getDepartment = useCallback(async () => {
        const CollectionRef = collection(db, "Department");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setMngDepartmentData(Datas))
    }, [dispatch])

    const getEmployee = useCallback(async () => {
        const CollectionRef = collection(db, "Employee");
        const data = await getDocs(CollectionRef);
        const Datas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setMngEmployeeData(Datas))
    }, [dispatch])


    useEffect(() => {
        getPrjStatus()
        getPrjType()
        getTechStack()
        getCustomer()
        getDepartment()
        getEmployee()
    }, [getPrjStatus, getPrjType, getTechStack, getCustomer, getDepartment, getEmployee])

    useEffect(() => {
        const resetMembers = []
        dispatch(setMngProject({
            ...mngProjectState,
            members: resetMembers
        }))
    }, [mngProjectState.department])

    const handleCheckboxTech = (value) => {
        const isChecked = mngProjectState.techstack.includes(value)

        const checkboxListUpdate = isChecked ? mngProjectState.techstack.filter(item => item !== value) : [...mngProjectState.techstack, value]

        dispatch(setMngProject({
            ...mngProjectState,
            techstack: checkboxListUpdate
        }))
    }

    const handleCheckboxEmployee = (name, id) => {
        const isChecked = mngProjectState.members.some(info => info.personal_id === id)

        const checkboxListUpdate = isChecked ? mngProjectState.members.filter(item => item.personal_id !== id) : [...mngProjectState.members, { name: name, personal_id: id }]

        dispatch(setMngProject({
            ...mngProjectState,
            members: checkboxListUpdate
        }))
    }

    const handleSetEmployeeList = (value) => {
        console.log(mngProjectState, 'members')

        mngDepartmentData.forEach((item) => {
            if (item.name === value) {
                setEmployeeList(item.employee)
            }
        })
    }

    const mngProjectCollectionRef = collection(db, "Project");

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validation = Validate(mngProjectState);

        if (Object.values(validation).some(item => item)) {
            setError(validation);
            return;
        }

        await addDoc(mngProjectCollectionRef, mngProjectState)

        dispatch(setMngProject({
            name: '',
            status: '',
            type: '',
            techstack: [],
            department: '',
            members: [],
            customer: ''
        }))

        afterChanges()

        redirect('/home/manage-project')
    }

    return (
        <div className='CommonAddEdit'>
            <div className="title">
                Add Project
            </div>

            <div className="div-form">
                <form action="" className="">

                    <div className='input-title'>Name</div>
                    <input
                        type="text"
                        className='input'
                        value={mngProjectState.name}
                        onChange={(e) => {
                            dispatch(setMngProject({
                                ...mngProjectState,
                                name: e.target.value
                            }))
                        }} />

                    <div className="error">{error.name}</div>

                    <div className='input-title'>Status</div>
                    {/*  use select */}
                    <select
                        className='input'
                        value={mngProjectState.status}
                        onChange={(e) => {
                            dispatch(
                                setMngProject(
                                    {
                                        ...mngProjectState,
                                        status: e.target.value
                                    }))
                        }}>

                        <option value="" disabled>Choose the project status</option>

                        {prjStatusData.map((item) => {
                            if (item.status === 'ACTIVE') {
                                return (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                )
                            }

                            return ''
                        })}
                    </select>

                    <div className="error">{error.status}</div>

                    <div className='input-title'>Type</div>

                    <select
                        className='input'
                        value={mngProjectState.type}
                        onChange={(e) => {
                            dispatch(
                                setMngProject(
                                    {
                                        ...mngProjectState,
                                        type: e.target.value
                                    }))
                        }}>

                        <option value="" disabled>Choose the project status</option>

                        {prjTypeData.map((item) => {
                            if (item.status === 'ACTIVE') {
                                return (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                )
                            }

                            return null
                        })}
                    </select>

                    <div className="error">{error.type}</div>


                    <div className='input-title'>Tech Stack</div>

                    <div className='div-input-checkbox-section'>
                        {techStackData.map((item) => {
                            if (item.status === 'ACTIVE') {
                                return (
                                    <div key={item.name} >
                                        <input
                                            type='checkbox'
                                            className='input-checkbox'
                                            value={item.name}
                                            onChange={() => handleCheckboxTech(item.name)}
                                            checked={mngProjectState.techstack.includes(item.name)} />
                                        <div>{item.name}</div>
                                    </div>
                                )
                            }

                            return null
                        })}
                    </div>

                    <div className="error">{error.techstack}</div>


                    <div className='input-title'>Department</div>

                    <select
                        className='input'
                        value={mngProjectState.department}
                        onChange={(e) => {
                            handleSetEmployeeList(e.target.value)
                            dispatch(
                                setMngProject(
                                    {
                                        ...mngProjectState,
                                        department: e.target.value
                                    }))
                        }}>

                        <option value="" disabled>Choose the project department</option>

                        {mngDepartmentData.map((item) => {
                            return (
                                <option key={item.name} value={item.name}>{item.name}</option>
                            )
                        })}
                    </select>

                    <div className="error">{error.department}</div>

                    <div className='input-title'>{employeeList.length ? 'Employee' : ''}</div>
                    {/*map the list of employees that belongs to the seleted department */}

                    {/* Once the Department is chosen, you should be able to see 
                all members of said department, and select mulitple*/}

                    {employeeList.length ? (
                        <div className="div-input-checkbox-section">
                            {employeeList.map((item) => (
                                <div key={item.id} >
                                    <input
                                        type='checkbox'
                                        className='input-checkbox'
                                        value={item.name}
                                        onChange={() => handleCheckboxEmployee(item.name, item.personal_id)}
                                        checked={mngProjectState.members.some(info => info.personal_id === item.personal_id)} />
                                    <div>{item.name + ': ' + item.personal_id}</div>
                                </div>
                            ))}
                        </div>) : ''}

                    <div className="error">{employeeList.length ? error.members : ''}</div>


                    <div className='input-title'>Customer</div>

                    <select
                        className='input'
                        value={mngProjectState.customer}
                        onChange={(e) => {
                            dispatch(
                                setMngProject(
                                    {
                                        ...mngProjectState,
                                        customer: e.target.value
                                    }))
                        }}>

                        <option value="" disabled>Choose the customer</option>

                        {customerGroupData.map((item) => {
                            if (item.status === 'ACTIVE') {
                                return (
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                )
                            }

                            return null
                        })}
                    </select>

                    <div className="error">{error.customer}</div>

                    <button
                        className='btn-add-edit'
                        onClick={handleSubmit}>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProject