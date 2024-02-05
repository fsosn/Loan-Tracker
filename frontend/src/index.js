import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./auth/AuthContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
