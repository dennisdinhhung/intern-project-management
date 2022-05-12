import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { setTechStack, setTechStackData } from '../../reducer/action';
import { db } from '../../utils/firebase-config';

function AddTechStack() {
    const [state, dispatch] = useContext(Context)

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
                Add Tech Stack
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