import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const userEmail = localStorage.getItem("email");
        const userName = localStorage.getItem("userName");
        const userId = localStorage.getItem("userId");

        if (userToken && userEmail && userName && userId) {
            setUser({ email: userEmail, userName, userId });
        }
    }, []);

    const signin = (email, token, userName, userId) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userId);
        setUser({ email, userName, userId });
    };

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        setUser(null);
    };

    const checkIsLogged = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signin, signout, checkIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
