import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../utils/firebase-config"
import { useReducer } from "react";

export const ACTIONS = {
    SET_STATE_INFO: 'set-state-info',
    SET_PRJTYPE_DATA: 'set-prjtype-data'
}

export const setStateInfo = (payload) => ({
    type: ACTIONS.SET_STATE_INFO,
    payload
})

export const getPrjType = async (dispatch) => {
    const prjtypeCollectionRef = collection(db, "PrjType");
    const data = await getDocs(prjtypeCollectionRef);
    const prjTypeData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

    dispatch(setPrjTypeData(prjTypeData))
}

export const setPrjTypeData = (payload) => ({
    type: ACTIONS.SET_PRJTYPE_DATA,
    payload
})