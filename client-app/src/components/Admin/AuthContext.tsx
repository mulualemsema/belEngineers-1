import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

    const isAuthenticated = Boolean(token);

    const handleSetToken = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("authToken", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ token, setToken: handleSetToken, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
