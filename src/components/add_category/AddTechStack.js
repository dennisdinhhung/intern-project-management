import { addDoc, collection } from 'firebase/firestore';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setTechStack } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function AddTechStack({afterChanges}) {
    const [state, dispatch] = useContext(Context)

    const { techStackState } = state

    const redirect = useNavigate();

    const techStackCollectionRef = collection(db, "TechStack");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(techStackCollectionRef, techStackState)
        
        dispatch(setTechStack({
            name: '',
            description: '',
            status: ''
        }))

        afterChanges()

        redirect('/home/techstack')
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
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddTechStack