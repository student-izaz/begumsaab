import { createContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmin = async () => {
            const token = localStorage.getItem("adminToken");
            if (token) {
                try {
                    const res = await fetch("/api/admin/me", {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setAdmin(data);
                    }
                } catch (error) {
                    console.error("Admin authentication failed", error);
                }
            }
            setLoading(false);
        };

        fetchAdmin();
    }, []);

    const login = async (credentials) => {
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("adminToken", data.token);
            setAdmin(data.admin);
        }
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthContext;
