import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setCustomerGroup, setCustomerGroupData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function EditCustomerGroup() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        //get the specific prjType doc
        const editDoc = doc(db, 'CustomerGroup', customerGroupState.id)
        const updatedType = customerGroupState
        delete updatedType.id
        
        //update info onto firebase
        await updateDoc(editDoc, updatedType)
        
        afterChanges()

        dispatch(
            setCustomerGroup({
                name: '',
                description: '',
                priority: '',
                status: ''
            })
        )

        redirect('/home/customer-group')
    }


    return (
        <div className='CommonAddEdit'>
            <div className="title">
                Edit Customer Group
            </div>

            <form action="">
                <div className='input-title'>Name</div>
                <input
                    type="text"
                    className='input'
                    value={customerGroupState.name}
                    onChange={(e) => {
                        dispatch(
                            setCustomerGroup({ 
                                ...customerGroupState, 
                                name: e.target.value }))
                    }} />

                <div className='input-title'>Description</div>
                <input
                    type="text"
                    className='input'
                    value={customerGroupState.description}
                    onChange={(e) => {
                        dispatch(setCustomerGroup({ ...customerGroupState, description: e.target.value }))
                    }} />

                <div className='input-title'>Priority Number</div>
                <input
                    type='number'
                    className='input'
                    value={customerGroupState.priority}
                    onChange={(e) => {
                        dispatch(setCustomerGroup({ ...customerGroupState, priority: e.target.value }))
                    }} />

                <div className='input-title'>Status</div>
                <select
                    className='input'
                    value={customerGroupState.status}
                    onChange={(e) => {
                        dispatch(setCustomerGroup({ ...customerGroupState, status: e.target.value }))
                    }}>
                    <option value="" disabled>Choose the status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>

                <button
                    className='btn-add-edit'
                    onClick={handleSubmit}>
                    Edit
                </button>
            </form>
        </div>
    )
}

export default EditCustomerGroup