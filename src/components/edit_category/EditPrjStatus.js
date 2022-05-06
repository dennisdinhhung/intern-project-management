import { updateDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setPrjStatus } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function EditPrjStatus({ afterChanges }) {

    const [state, dispatch] = useContext(Context)
    const { prjStatusState } = state

    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //get the specific prjType doc
        const editDoc = doc(db, 'PrjStatus', prjStatusState.id)
        const updated = prjStatusState
        delete updated.id
        //update info onto firebase
        await updateDoc(editDoc, updated)
        afterChanges()

        dispatch(
            setPrjStatus({
                name: '',
                description: '',
                status: ''
            })
        )

        redirect('/home/project-status')
    }


    return (
        <div className='AddProjectType Common'>
            <div className="title">
                Edit Project Type
            </div>

            <form action="">
                <div>Name</div>
                <input
                    type="text"
                    className='input-name'
                    value={prjStatusState.name}
                    onChange={(e) => {
                        dispatch(
                            setPrjStatus({ 
                                ...prjStatusState, 
                                name: e.target.value }))
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
                    Edit
                </button>
            </form>
        </div>
    )
}

export default EditPrjStatus