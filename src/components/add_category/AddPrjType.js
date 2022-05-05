import { async } from '@firebase/util';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/firebase-config';

function AddPrjType({afterChanges}) {
    
    const [addType, setAddType] = useState({
        name: '',
        description: '',
        priority: '',
        status: ''
    })

    const redirect = useNavigate();
    
    const prjtypeCollectionRef = collection(db, "PrjType");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(prjtypeCollectionRef, addType)
        
        setAddType({
            name: '',
            description: '',
            priority: '',
            status: ''
        })

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
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddPrjType