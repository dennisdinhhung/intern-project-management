export const ACTIONS = {
    SET_PRJTYPE: 'set-prjtype',
    SET_PRJSTATUS: 'set-prjstataus',
    SET_TECHSTACK: 'set-techstack',
    SET_CUSTOMER_GROUP: 'set-customer-group',
    SET_PRJTYPE_DATA: 'set-prjtype-data',
    SET_PRJSTATUS_DATA: 'set-prjstatus-data',
    SET_TECHSTACK_DATA: 'set-techstack-data',
    SET_CUSTOMER_GROUP_DATA: 'set-customer-group-data',

    SET_MNG_DEPARTMENT: 'set-mng-department',
    SET_MNG_DEPARTMENT_DATA: 'set-mng-department-data',
    SET_MNG_EMPLOYEE: 'set-mng-employee',
    SET_MNG_EMPLOYEE_DATA: 'set-mng-employee-data',
    SET_MNG_PROJECT: 'set-mng-project',
    SET_MNG_PROJECT_DATA: 'set-mng-project-data'
}

export const setPrjType = (payload) => ({
    type: ACTIONS.SET_PRJTYPE,
    payload
})

export const setPrjStatus = (payload) => ({
    type: ACTIONS.SET_PRJSTATUS,
    payload
})

export const setTechStack = (payload) => ({
    type: ACTIONS.SET_TECHSTACK,
    payload
})

export const setCustomerGroup = (payload) => ({
    type: ACTIONS.SET_CUSTOMER_GROUP,
    payload
})

export const setPrjTypeData = (payload) => ({
    type: ACTIONS.SET_PRJTYPE_DATA,
    payload
})

export const setPrjStatusData = (payload) => ({
    type: ACTIONS.SET_PRJSTATUS_DATA,
    payload
})

export const setTechStackData = (payload) => ({
    type: ACTIONS.SET_TECHSTACK_DATA,
    payload
})

export const setCustomerGroupData = (payload) => ({
    type: ACTIONS.SET_CUSTOMER_GROUP_DATA,
    payload
})

//* MANAGEMENT DEP
export const setMngDepartment = (payload) => ({
    type: ACTIONS.SET_MNG_DEPARTMENT,
    payload
})

export const setMngDepartmentData = (payload) => ({
    type: ACTIONS.SET_MNG_DEPARTMENT_DATA,
    payload
})

//* MANAGEMENT EMP
export const setMngEmployee = (payload) => ({
    type: ACTIONS.SET_MNG_EMPLOYEE,
    payload
})

export const setMngEmployeeData = (payload) => ({
    type: ACTIONS.SET_MNG_EMPLOYEE_DATA,
    payload
})

//* MANAGEMENT PROJ
export const setMngProject = (payload) => ({
    type: ACTIONS.SET_MNG_PROJECT,
    payload
})

export const setMngProjectData = (payload) => ({
    type: ACTIONS.SET_MNG_PROJECT_DATA,
    payload
})
