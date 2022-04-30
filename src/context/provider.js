import React from 'react'
import Context from './context'
import reducer, {initialState} from '../reducer/reducer'
import { useReducer } from 'react'

function Provider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
    <Context.Provider value={[state, dispatch]}>
        {children}
    </Context.Provider>
  )
}

export default Provider