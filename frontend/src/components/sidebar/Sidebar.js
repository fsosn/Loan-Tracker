import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCommentsDollar,
    faHandHoldingDollar,
    faSackDollar,
    faSignOutAlt,
    faUser,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext.js";
import {useNavigate} from "react-router-dom";
import "../../styles.css"
import PropTypes from "prop-types";

const Sidebar = ({collapsed, setCollapsed}) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div className="sidebar">
            <div className="logo-container" onClick={() => setCollapsed(!collapsed)}>
                <FontAwesomeIcon icon={faBars} className="toggle-icon"/>
                <h1 className="company-name">Loan Tracker</h1>
            </div>
            <div className="menu-item" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faHandHoldingDollar} className="menu-item-icon"/>
                <span className="menu-link">Lent</span>
            </div>

            <div
                className="menu-item"
                onClick={() => navigate("/borrowed")}
            >
                <FontAwesomeIcon icon={faSackDollar} className="menu-item-icon"/>
                <span className="menu-link">Borrowed</span>
            </div>
            <div
                className="menu-item"
                onClick={() => navigate("/users")}
            >
                <FontAwesomeIcon icon={faUsers} className="menu-item-icon"/>
                <span className="menu-link">Users</span>
            </div>
            <div
                className="menu-item"
                onClick={() => navigate("/requests")}
            >
                <FontAwesomeIcon icon={faCommentsDollar} className="menu-item-icon"/>
                <span className="menu-link">Requests</span>
            </div>
            <div
                className="menu-item"
                onClick={() => navigate("/account")}
            >
                <FontAwesomeIcon icon={faUser} className="menu-item-icon"/>
                <span className="menu-link">Account</span>
            </div>
            <div className="spacer-logout"></div>
            <div
                className="menu-item"
                onClick={handleSignOut}
            >
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-item-icon"/>
                <span className="menu-link">Log out</span>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default Sidebar;
