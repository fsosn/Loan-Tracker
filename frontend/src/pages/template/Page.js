import Sidebar from "../../components/sidebar/Sidebar.js";
import Header from "../../components/header/Header.js";
import {useState} from "react";

const Page = ({pageTitle, children}) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="container-fluid">
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title={pageTitle}/>
                {children}
            </div><Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
        </div>
    );
};

export default Page;
