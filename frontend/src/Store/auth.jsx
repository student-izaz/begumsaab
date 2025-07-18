import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const authorizationToken = token;
    const [userLoading, setUserLoading] = useState(true)

    const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://your-app-name.onrender.com"; // Change to your actual backend URL


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
            const response = await fetch(`${API_URL}/api/auth/user`, {
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
        <AuthContext.Provider value={{  isLoggedIn, user, StoreTokenInLS, logoutUser, authorizationToken, userAuthentication, userLoading, API_URL }}>
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
