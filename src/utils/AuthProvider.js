import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

import { auth } from "./firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [authUser, setAuthUser] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoading(false)
            setAuthUser(user)
        })

        return unsubscribe
    }, [])
    

    const login = (input) => {
        return signInWithEmailAndPassword(auth, input.username, input.password)
    }

    const logout = () => {
        return signOut(auth);
    }

    return (
        <AuthContext.Provider value={{authUser, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext