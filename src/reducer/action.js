export const ACTIONS = {
    SET_PRJTYPE: 'set-prjtype',
    SET_PRJSTATUS: 'set-prjstataus',
    SET_PRJTYPE_DATA: 'set-prjtype-data',
    SET_PRJSTATUS_DATA: 'set-prjstatus-data'
}

export const setPrjType = (payload) => ({
    type: ACTIONS.SET_PRJTYPE,
    payload
})

export const setPrjStatus = (payload) => ({
    type: ACTIONS.SET_PRJSTATUS,
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