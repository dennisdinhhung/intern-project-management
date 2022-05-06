import { ACTIONS } from "./action"

export const initialState = {
    prjTypeState: {
        name: '',
        description: '',
        priority: '',
        status: ''
    },
    prjStatusState: {
        name: '',
        description: '',
        status: ''
    },
    prjTypeData: [],
    prjStatusData: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_PRJTYPE:
            return {
                ...state,
                prjTypeState: action.payload
            }
        case ACTIONS.SET_PRJSTATUS:
            return {
                ...state,
                prjStatusState: action.payload
            }
        case ACTIONS.SET_PRJTYPE_DATA:
            return {
                ...state,
                prjTypeData: action.payload
            }
        case ACTIONS.SET_PRJSTATUS_DATA:
            return {
                ...state,
                prjStatusData: action.payload
            }
        default:
            return state
    }
}

export default reducer