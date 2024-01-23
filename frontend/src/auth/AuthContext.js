import {createContext, useState} from "react";
import {auth} from "./auth.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [email, setEmail] = useState(null);

    let signIn = (email, password, callback) => {
        return auth.signIn(email, password, () => {
            setEmail(email);
            callback();
        });
    };

    let signOut = (callback) => {
        return auth.signOut(() => {
            setEmail(null);
            callback();
        });
    };


    return (
        <AuthContext.Provider value={{user: email, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};