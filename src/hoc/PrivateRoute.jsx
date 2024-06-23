import { useContext, createContext, useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext({
    user: null,
    isLoading: true
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        if (isLoggedIn) {
            setUser(localStorage.getItem("jwt_authorization"));
            setIsLoading(false);
        }
    }, [isLoggedIn])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, isLoading, setUser, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const PrivateRoute = ({ children }) => {
   
    if(!localStorage.getItem("jwt_authorization")){
        return <Navigate to="/login" />;
    }

    return children;
}