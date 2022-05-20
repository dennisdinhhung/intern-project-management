import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';
import { setPrjStatus, setPrjStatusData } from '../../reducer/action';
import Validate from '../Validate';

function EditPrjStatus() {

    const [state, dispatch] = useContext(Context)

    const [error, setError] = useState({})

    const { prjStatusState } = state

    const getPrjStatus = useCallback(async () => {
        const prjstatusCollectionRef = collection(db, "PrjStatus");
        const data = await getDocs(prjstatusCollectionRef);
        const prjStatusData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setPrjStatusData(prjStatusData))
    }, [dispatch])

    const afterChanges = () => {
        getPrjStatus()
    }

    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = Validate(prjStatusState);

        if (Object.values(validation).some(item => item)) {
            setError(validation);
            return;
        }

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
        <div className='CommonAddEdit'>
            <div className="title">
                Edit Project Status
            </div>

            <form action="">
                <div className='input-title'>Name</div>
                <input
                    type="text"
                    className='input'
                    value={prjStatusState.name}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, name: e.target.value }))
                    }} />

                <div className="error">{error.name}</div>

                <div className='input-title'>Description</div>
                <input
                    type="text"
                    className='input'
                    value={prjStatusState.description}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, description: e.target.value }))
                    }} />

                <div className="error">{error.description}</div>

                <div className='input-title'>Status</div>
                <select
                    name=""
                    id=""
                    className='input'
                    value={prjStatusState.status}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, status: e.target.value }))
                    }}>
                    <option value="" disabled>Choose the status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>

                <div className="error">{error.status}</div>

                <button
                    className='btn-add-edit'
                    onClick={handleSubmit}>
                    Edit
                </button>
            </form>
        </div>
    )
}

export default EditPrjStatus