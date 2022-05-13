import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';
import { setPrjStatus, setPrjStatusData } from '../../reducer/action';

function AddPrjStatus() {

    const [state, dispatch] = useContext(Context)
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
        <div className='CommonAddEdit'>
            <div className="title">
                Add Project Status
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

                <div className='input-title'>Description</div>
                <input
                    type="text"
                    className='input'
                    value={prjStatusState.description}
                    onChange={(e) => {
                        dispatch(setPrjStatus({ ...prjStatusState, description: e.target.value }))
                    }} />

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

                <button
                    className='btn-add-edit'
                    onClick={handleSubmit}>
                    Add
                </button>
            </form>
        </div>
    )
}

export default AddPrjStatus