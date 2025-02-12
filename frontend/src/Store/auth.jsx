import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const authorizationToken = token;
    const [userLoading, setUserLoading] = useState(true)

    const logoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    const StoreTokenInLS = (serverToken) => {
        return localStorage.setItem('token', serverToken)
    }

    let isLoggedIn = !!token;

    const userAuthentication = async () => {
        setUserLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                },
            })

            if(response.ok){
                const data = await response.json();
                setUser(data);
                setUserLoading(false);
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        userAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{  isLoggedIn, user, StoreTokenInLS, logoutUser, authorizationToken, userAuthentication, userLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const authContextValue =  useContext( AuthContext );
    if(!authContextValue) {
        throw new Error("useAuth used outside of the Provider.");
    };
    return authContextValue;
};