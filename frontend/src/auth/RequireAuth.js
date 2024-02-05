import {Navigate, useLocation} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./AuthContext.js";
import PropTypes from "prop-types";

export function RequireAuth({children}) {
    let auth = useContext(AuthContext);
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }

    return children;
}

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};