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
    customerGroupData: [],

    //* manage
    mngDepartmentState: {
        name: '',
        function: '',
        employee: [],
        project: [],
        techstack: []
    },
    mngDepartmentData: [],

    mngEmployeeState: {
        personal_id: '',
        personal_info: {
            name: '',
            dob: '',
            phone: ''
        },
        project_participated: [],
        techstack_info: []
    },
    mngEmployeeData: [],

    mngProjectState: {
        name: '',
        status: '',
        type: '',
        techstack: [],
        department: '',
        members: [],
        customer: ''
    },
    mngProjectData: []
}

const reducer = (state, action) => {
    switch (action.type) {
        //* CATEGORY
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

        //* MANAGE
        case ACTIONS.SET_MNG_DEPARTMENT:
            return {
                ...state,
                mngDepartmentState: action.payload
            }
        case ACTIONS.SET_MNG_DEPARTMENT_DATA:
            return {
                ...state,
                mngDepartmentData: action.payload
            }
        case ACTIONS.SET_MNG_EMPLOYEE:
            return {
                ...state,
                mngEmployeeState: action.payload
            }
        case ACTIONS.SET_MNG_EMPLOYEE_DATA:
            return {
                ...state,
                mngEmployeeData: action.payload
            }
        case ACTIONS.SET_MNG_PROJECT:
            return {
                ...state,
                mngProjectState: action.payload
            }
        case ACTIONS.SET_MNG_PROJECT_DATA:
            return {
                ...state,
                mngProjectData: action.payload
            }
        default:
            return state
    }
}

export default reducer