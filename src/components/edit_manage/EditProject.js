import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setCustomerGroupData, setMngDepartmentData, setMngEmployeeData, setMngProject, setMngProjectData, setPrjStatusData, setPrjTypeData, setTechStackData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function EditProject() {

    const [state, dispatch] = useContext(Context)

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

    const handleCheckboxTech = (value) => {
        const isChecked = mngProjectState.techstack.includes(value)

        const checkboxListUpdate = isChecked ? mngProjectState.techstack.filter(item => item !== value) : [...mngProjectState.techstack, value]

        dispatch(setMngProject({
            ...mngProjectState,
            techstack: checkboxListUpdate
        }))
    }

    const handleCheckboxEmployee = (value) => {
        const isChecked = mngProjectState.members.includes(value)

        const checkboxListUpdate = isChecked ? mngProjectState.members.filter(item => item !== value) : [...mngProjectState.members, value]

        dispatch(setMngProject({
            ...mngProjectState,
            members: checkboxListUpdate
        }))
    }

    const handleSetEmployeeList = (value) => {
        // setEmployeeList(value)

        mngDepartmentData.forEach((item) => {
            if (item.name === value) {
                setEmployeeList(item.employee)
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const editDoc = doc(db, 'Project', mngProjectState.id)
        const updated = mngProjectState
        delete updated.id

        await updateDoc(editDoc, updated)

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
                Edit Project
            </div>

            <div className="div-form">
                <form action="" className="">

                    <div>Name</div>
                    <input
                        type="text"
                        className=''
                        value={mngProjectState.name}
                        onChange={(e) => {
                            dispatch(setMngProject({
                                ...mngProjectState,
                                name: e.target.value
                            }))
                        }} />

                    <div>Status</div>
                    {/*  use select */}
                    <select
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

                    <div>Type</div>

                    <select
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


                    <div>Tech Stack</div>

                    <div>
                        {techStackData.map((item) => {
                            if (item.status === 'ACTIVE') {
                                return (
                                    <div key={item.name} >
                                        <input
                                            type='checkbox'
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


                    <div>Department</div>

                    <select
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

                    <div>Employee</div>
                    {/*map the list of employees that belongs to the seleted department */}

                    {/* Once the Department is chosen, you should be able to see 
                all members of said department, and select mulitple*/}

                    {employeeList.map((item) => (
                        <div key={item} >
                            <input
                                type='checkbox'
                                value={item}
                                onChange={() => handleCheckboxEmployee(item)}
                                checked={mngProjectState.members.includes(item)} />
                            <div>{item}</div>
                        </div>
                    ))}



                    <div>Customer</div>

                    <select
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
                            return (
                                <option key={item.name} value={item.name}>{item.name}</option>
                            )
                        })}
                    </select>

                    <button
                        onClick={handleSubmit}>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProject