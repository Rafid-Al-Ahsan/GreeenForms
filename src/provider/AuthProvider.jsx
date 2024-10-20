/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
 
    const auth = getAuth(app);

    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, loggedUser => {
            setUser(loggedUser);
            setLoading(false);
        })

        return () => {
            unsuscribe();
        }
    }, )

    const logout = () => {
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        logout, 
    }

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
               {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;