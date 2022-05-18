import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setTechStack, setTechStackData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';
import Validate from '../Validate';

function AddTechStack() {
    const [state, dispatch] = useContext(Context)

    const [error, setError] = useState({})

    const { techStackState } = state

    const getTechStack = useCallback(async () => {
        const teckStackCollectionRef = collection(db, "TechStack");
        const data = await getDocs(teckStackCollectionRef);
        const teckStackData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setTechStackData(teckStackData))
    }, [dispatch])

    const afterChanges = () => {
        getTechStack()
    }

    const redirect = useNavigate();

    const techStackCollectionRef = collection(db, "TechStack");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = Validate(techStackState);

        if (Object.values(validation).some(item => item)) {
            setError(validation);
            return;
        }

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
        <div className='CommonAddEdit'>
            <div className="title">
                Add Tech Stack
            </div>

            <form action="">
                <div className='input-title'>Name</div>
                <input
                    type="text"
                    className='input'
                    value={techStackState.name}
                    onChange={(e) => {
                        dispatch(
                            setTechStack({
                                ...techStackState,
                                name: e.target.value
                            }))
                    }} />

                <div className="error">{error.name}</div>

                <div className='input-title'>Description</div>
                <input
                    type="text"
                    className='input'
                    value={techStackState.description}
                    onChange={(e) => {
                        dispatch(setTechStack({ ...techStackState, description: e.target.value }))
                    }} />

                <div className="error">{error.description}</div>

                <div className='input-title'>Status</div>
                <select
                    name=""
                    id=""
                    className='input'
                    value={techStackState.status}
                    onChange={(e) => {
                        dispatch(setTechStack({ ...techStackState, status: e.target.value }))
                    }}>
                    <option value="" disabled>Choose the status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>

                <div className="error">{error.status}</div>

                <button
                    className='btn-add-edit'
                    onClick={handleSubmit}>
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddTechStack