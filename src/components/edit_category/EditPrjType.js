import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../../context/context';
import { db } from '../../utils/firebase-config';
import { setPrjType, setPrjTypeData } from '../../reducer/action';

function EditPrjType() {

    const [state, dispatch] = useContext(Context)
    const { prjTypeState } = state

    const redirect = useNavigate();

    const getPrjType = useCallback(async () => {
        const prjtypeCollectionRef = collection(db, "PrjType");
        const data = await getDocs(prjtypeCollectionRef);
        const prjTypeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(setPrjTypeData(prjTypeData))
    }, [dispatch])

    const afterChanges = () => {
        getPrjType();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //get the specific prjType doc
        const editDoc = doc(db, 'PrjType', prjTypeState.id)
        const updatedType = prjTypeState
        delete updatedType.id
        //update info onto firebase
        await updateDoc(editDoc, updatedType)
        afterChanges()

        dispatch(
            setPrjType({
                name: '',
                description: '',
                priority: '',
                status: ''
            })
        )

        redirect('/home/project-type')
    }


    return (
        <div className='CommonAddEdit'>
            <div className="title">
                Edit Project Type
            </div>

            <form action="">
                <div>Name</div>
                <input
                    type="text"
                    className='input-name'
                    value={prjTypeState.name}
                    onChange={(e) => {
                        dispatch(
                            setPrjType({ 
                                ...prjTypeState, 
                                name: e.target.value }))
                    }} />

                <div>Description</div>
                <input
                    type="text"
                    className='input-desc'
                    value={prjTypeState.description}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, description: e.target.value }))
                    }} />

                <div>Priority Number</div>
                <input
                    type='number'
                    className='input-priority'
                    value={prjTypeState.priority}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, priority: e.target.value }))
                    }} />

                <div>Status</div>
                <select
                    name=""
                    id=""
                    value={prjTypeState.status}
                    onChange={(e) => {
                        dispatch(setPrjType({ ...prjTypeState, status: e.target.value }))
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