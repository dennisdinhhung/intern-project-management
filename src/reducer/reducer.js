import { ACTIONS } from "./action"

export const initialState = {
    users: localStorage.getItem('intern') ? JSON.parse(localStorage.getItem('intern')) : [],
    user: {
        id: '',
        prj_name: '',
        prj_desc: '',
        prj_priority: '',
        prj_status: '',
        prj_staus_desc: '',
        prj_tech_stack: '',
        customer_name: '',
        customer_desc: '',
        customer_priority: '',
        customer_status: '' /*do i need this one?*/
    }
}

const reducer = (state, action) => {
    switch (action.type){
        case ACTIONS.SET_STATE_INFO:
            return {
                ...state, 
                user: action.payload
            }
        default:
            return state
    }
}

export default reducer