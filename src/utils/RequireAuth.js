import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'


export const RequireAuth = ({children}) => {

    const { authUser } = useAuth();

    if(!authUser){
        return <Navigate to='/'/>
    }

    return children
}