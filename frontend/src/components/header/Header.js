import "../../styles.css";
import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext.js";
import PropTypes from "prop-types";

const Header = ({title}) => {
    const auth = useContext(AuthContext);

    return (
        <div className="header bg-body">
            <h1 className="title-font title-dashboard">{title}</h1>
            <div className="header-icons">
                <div className="user-info account-name">
                    {auth.user}
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
