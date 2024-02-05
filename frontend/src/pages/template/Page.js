import Sidebar from "../../components/sidebar/Sidebar.js";
import Header from "../../components/header/Header.js";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const Page = ({pageTitle, children}) => {
    const storedCollapsed = localStorage.getItem("collapsed");
    const [collapsed, setCollapsed] = useState(storedCollapsed === "true");

    useEffect(() => {
        localStorage.setItem("collapsed", String(collapsed));
    }, [collapsed]);

    return (
        <div className="container-fluid">
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title={pageTitle}/>
                {children}
            </div>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
        </div>
    );
};

Page.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Page;
