import "../../styles.css";
import {useContext} from "react";
import {AuthContext} from "../../auth/AuthContext.js";

const Header = ({title}) => {
    const auth = useContext(AuthContext);

    return (
        <div className="header bg-body">
            <h1 className="title-font title-dashboard">{title}</h1>
            <div className="header-icons">
                <div className="user-info margin-right-16">
                    {auth.user}
                </div>
            </div>
        </div>
    );
};

export default Header;
