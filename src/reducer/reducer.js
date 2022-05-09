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
    techStackState: {
        name: '',
        description: '',
        status: ''
    },
    customerGroupState: {
        name: '',
        description: '',
        priority: '',
        status: ''
    },
    prjTypeData: [],
    prjStatusData: [],
    techStackData: [],
    customerGroupData: []
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
        case ACTIONS.SET_TECHSTACK:
            return {
                ...state,
                techStackState: action.payload
            }
        case ACTIONS.SET_CUSTOMER_GROUP:
            return {
                ...state,
                customerGroupState: action.payload
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
        case ACTIONS.SET_TECHSTACK_DATA:
            return {
                ...state,
                techStackData: action.payload
            }
        case ACTIONS.SET_CUSTOMER_GROUP_DATA:
            return {
                ...state,
                customerGroupData: action.payload
            }
        default:
            return state
    }
}

export default reducer