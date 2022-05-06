import { addDoc, collection } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setPrjType } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function AddPrjType({afterChanges}) {

    const [state, dispatch] = useContext(Context)

    const { prjTypeState } = state

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
        <div className='AddProjectType Common'>
            <div className="title">
                Add Project Type
            </div>

            <form action="">
                <div>Name</div>
                <input
                    type="text"
                    className='input-name'
                    value={prjTypeState.name}
                    onChange={(e) => {
                        dispatch(
                            setPrjType({ 
                                ...prjTypeState, 
                                name: e.target.value }))
                    }} />

                <div>Description</div>
                <input
                    type="text"
                    className='input-desc'
                    value={prjTypeState.description}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, description: e.target.value }))
                    }} />

                <div>Priority Number</div>
                <input
                    type='number'
                    className='input-priority'
                    value={prjTypeState.priority}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, priority: e.target.value }))
                    }} />

                <div>Status</div>
                <select
                    name=""
                    id=""
                    value={prjTypeState.status}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, status: e.target.value }))
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

export default AddPrjType