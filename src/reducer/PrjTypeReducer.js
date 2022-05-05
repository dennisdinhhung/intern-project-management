import { ACTIONS } from "./action"

export const initialState = {
    prjTypeData: []
}

const PrjTypeReducer = (state, action) => {
    switch (action.type){
        case ACTIONS.SET_PRJTYPE_DATA:
            
            const newList = [...action.payload]

            localStorage.setItem('intern', JSON.stringify(newList))

            return {
                ...state,
                prjTypeData: action.payload
            }
        default:
            return state
    }
}

export default PrjTypeReducer

