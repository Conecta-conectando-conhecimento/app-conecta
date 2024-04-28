import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const userEmail = localStorage.getItem("email");
        const userName = localStorage.getItem("userName");

        if (userToken && userEmail && userName) {
            setUser({ email: userEmail, userName });
        }
    }, []);

    const signin = (email, token, userName) => {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userName", userName);
        setUser({ email, userName });
    };

    const signout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
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
