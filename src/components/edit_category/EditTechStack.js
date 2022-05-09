import { updateDoc, doc } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setTechStack } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function EditTechStack({afterChanges}) {
    const [state, dispatch] = useContext(Context)
    const { techStackState } = state

    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        //get the specific prjType doc
        const editDoc = doc(db, 'TechStack', techStackState.id)
        const updated = techStackState
        delete updated.id
        //update info onto firebase
        await updateDoc(editDoc, updated)
        afterChanges()

        dispatch(
            setTechStack({
                name: '',
                description: '',
                status: ''
            })
        )

        redirect('/home/techstack')
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
                    value={techStackState.name}
                    onChange={(e) => {
                        dispatch(
                            setTechStack({ 
                                ...techStackState, 
                                name: e.target.value }))
                    }} />

                <div>Description</div>
                <input
                    type="text"
                    className='input-desc'
                    value={techStackState.description}
                    onChange={(e) => {
                        dispatch(setTechStack({ ...techStackState, description: e.target.value }))
                    }} />

                <div>Status</div>
                <select
                    name=""
                    id=""
                    value={techStackState.status}
                    onChange={(e) => {
                        dispatch(setTechStack({ ...techStackState, status: e.target.value }))
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

export default EditTechStack