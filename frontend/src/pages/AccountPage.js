import Page from "./template/Page.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {faKey} from "@fortawesome/free-solid-svg-icons/faKey";
import FailedLoginAttempts from "../components/failed-login/FailedLoginAttempts.js"

const AccountPage = () => {
    const navigate = useNavigate();

    return (
        <Page pageTitle={"Account"}>
            <div className={"page-content vh-100"}>
                <div className={"pt-3 pb-5"}>
                    <button onClick={() => navigate("/change-password")} className="btn btn-success">
                        <FontAwesomeIcon icon={faKey} className={"margin-right-4"}/> Change password
                    </button>
                </div>
                <FailedLoginAttempts/>
            </div>
        </Page>
    );
};

export default AccountPage;
