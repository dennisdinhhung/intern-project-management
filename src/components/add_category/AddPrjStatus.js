import { addDoc, collection } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';
import { setPrjStatus } from '../../reducer/action';

function AddPrjStatus({ afterChanges }) {

    const [state, dispatch] = useContext(Context)
    const { prjStatusState } = state

    const redirect = useNavigate();

    const prjstatusCollectionRef = collection(db, "PrjStatus");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(prjstatusCollectionRef, prjStatusState)

        dispatch(
            setPrjStatus({
                name: '',
                description: '',
                priority: '',
                status: ''
            }))

        afterChanges()

        redirect('/home/project-status')
    }

    return (
        <div className='AddProjectStatus Common'>
            <div className="title">
                Add Project Status
            </div>

            <form action="">
                <div>Name</div>
                <input
                    type="text"
                    className='input-name'
                    value={prjStatusState.name}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, name: e.target.value }))
                    }} />

                <div>Description</div>
                <input
                    type="text"
                    className='input-desc'
                    value={prjStatusState.description}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, description: e.target.value }))
                    }} />

                <div>Status</div>
                <select
                    name=""
                    id=""
                    value={prjStatusState.status}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, status: e.target.value }))
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

export default AddPrjStatus