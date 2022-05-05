import { async } from '@firebase/util';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/firebase-config';

function EditPrjType({state, afterChanges}) {
    
    const [addType, setAddType] = useState({
        name: '',
        description: '',
        priority: '',
        status: ''
    })
    
    useEffect(() => {
        setAddType(state)
    }, [state])

    const redirect = useNavigate();
    
    const usersCollectionRef = collection(db, "PrjType");

    const handleSubmit = async (e) => {
        e.preventDefault();

        //get the specific prjType doc
        const editDoc = doc(db, 'PrjType', addType.id)
        const updatedType = addType
        delete updatedType.id
        //update info onto firebase
        await updateDoc(editDoc, addType)
        afterChanges()
        
        setAddType({
            name: '',
            description: '',
            priority: '',
            status: ''
        })

        redirect('/home/project-type')
    }


    return (
        <div className='AddProjectType Common'>
            <div className="title">
                Edit Project Type
            </div>

            <form action="">
                {/* testing */}
                <div>
                    {addType.id}
                </div>


                <div>Name</div>
                <input 
                    type="text" 
                    className='input-name'
                    value={addType.name}
                    onChange={(e) => {
                        setAddType({...addType, name: e.target.value})
                    }}/>

                <div>Description</div>
                <input 
                    type="text" 
                    className='input-desc'
                    value={addType.description}
                    onChange={(e) => {
                        setAddType({...addType, description: e.target.value})
                    }}/>

                <div>Priority Number</div>
                <input 
                    type='number'
                    className='input-priority'
                    value={addType.priority}
                    onChange={(e) => {
                        setAddType({...addType, priority: e.target.value})
                    }}/>

                <div>Status</div>
                <select 
                    name="" 
                    id=""
                    value={addType.status}
                    onChange={(e) => {
                        setAddType({...addType, status: e.target.value})
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

export default EditPrjType