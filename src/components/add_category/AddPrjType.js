import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';
import { setPrjType, setPrjTypeData } from '../../reducer/action';

function AddPrjType() {

    const [state, dispatch] = useContext(Context)

    const { prjTypeState } = state

    const getPrjType = useCallback(async () => {
        const prjtypeCollectionRef = collection(db, "PrjType");
        const data = await getDocs(prjtypeCollectionRef);
        const prjTypeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setPrjTypeData(prjTypeData))
    }, [dispatch])

    const afterChanges = () => {
        getPrjType();
    }

    const redirect = useNavigate();

    const prjtypeCollectionRef = collection(db, "PrjType");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(prjtypeCollectionRef, prjTypeState)
        
        dispatch(setPrjType({
            name: '',
            description: '',
            priority: '',
            status: ''
        }))

        afterChanges()

        redirect('/home/project-type')
    }


    return (
        <div className='CommonAddEdit'>
            <div className="title">
                Add Project Type
            </div>

            <form action="">
                <div className='input-title'>Name</div>
                <input
                    type="text"
                    className='input'
                    value={prjTypeState.name}
                    onChange={(e) => {
                        dispatch(
                            setPrjType({ 
                                ...prjTypeState, 
                                name: e.target.value }))
                    }} />

                <div className='input-title'>Description</div>
                <input
                    type="text"
                    className='input'
                    value={prjTypeState.description}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, description: e.target.value }))
                    }} />

                <div className='input-title'>Priority Number</div>
                <input
                    type='number'
                    className='input'
                    value={prjTypeState.priority}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, priority: e.target.value }))
                    }} />

                <div className='input-title'>Status</div>
                <select
                    name=""
                    id=""
                    className='input'
                    value={prjTypeState.status}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, status: e.target.value }))
                    }}>
                    <option value="" disabled>Choose the status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>

                <button
                    className='btn-add-edit'
                    onClick={handleSubmit}>
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddPrjType