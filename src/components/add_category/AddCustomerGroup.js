import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setCustomerGroup, setCustomerGroupData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function AddCustomerGroup() {
    const [state, dispatch] = useContext(Context)

    const { customerGroupState } = state

    const getCustomerGroup = useCallback(async () => {
        const customerGroupCollectionRef = collection(db, "CustomerGroup");
        const data = await getDocs(customerGroupCollectionRef);
        const customerGroupData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setCustomerGroupData(customerGroupData))
    }, [dispatch])

    const afterChanges = () => {
        getCustomerGroup()
    }

    const redirect = useNavigate();

    const CustomerGroupCollectionRef = collection(db, "CustomerGroup");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(CustomerGroupCollectionRef, customerGroupState)
        
        dispatch(setCustomerGroup({
            name: '',
            description: '',
            priority: '',
            status: ''
        }))

        afterChanges()

        redirect('/home/customer-group')
    }


    return (
        <div className='AddProjectType Common'>
            <div className="title">
                Add Customer Group
            </div>

            <form action="">
                <div>Name</div>
                <input
                    type="text"
                    className='input-name'
                    value={customerGroupState.name}
                    onChange={(e) => {
                        dispatch(
                            setCustomerGroup({ 
                                ...customerGroupState, 
                                name: e.target.value }))
                    }} />

                <div>Description</div>
                <input
                    type="text"
                    className='input-desc'
                    value={customerGroupState.description}
                    onChange={(e) => {
                        dispatch(setCustomerGroup({ ...customerGroupState, description: e.target.value }))
                    }} />

                <div>Priority Number</div>
                <input
                    type='number'
                    className='input-priority'
                    value={customerGroupState.priority}
                    onChange={(e) => {
                        dispatch(setCustomerGroup({ ...customerGroupState, priority: e.target.value }))
                    }} />

                <div>Status</div>
                <select
                    name=""
                    id=""
                    value={customerGroupState.status}
                    onChange={(e) => {
                        dispatch(setCustomerGroup({ ...customerGroupState, status: e.target.value }))
                    }}>
                    <option value="" disabled>Choose the status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>

                <button
                    className='btn-add-prj'
                    onClick={handleSubmit}>
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddCustomerGroup