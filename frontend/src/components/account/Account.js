import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey} from "@fortawesome/free-solid-svg-icons/faKey";
import FailedLoginAttempts from "../failed-login/FailedLoginAttempts.js"
import {useState} from "react";
import ChangePasswordForm from "../auth/change-password-form/ChangePasswordForm.js";
import "../../styles.css";

const Account = () => {
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

    const openChangePasswordForm = () => {
        setShowChangePasswordForm(true);
    };

    const closeChangePasswordForm = () => {
        setShowChangePasswordForm(false);
    };

    return (
        <div className={"page-content vh-100"}>
            <div className={"pt-3 pb-5"}>
                <button onClick={openChangePasswordForm} className="btn btn-success">
                    <FontAwesomeIcon icon={faKey} className={"margin-right-4"}/> Change password
                </button>
            </div>
            <FailedLoginAttempts/>
            <div className={`${showChangePasswordForm ? "darken-background" : ""}`}>
                {showChangePasswordForm &&
                    <ChangePasswordForm
                        onClose={closeChangePasswordForm}
                    />
                }
            </div>
        </div>
    )
}

export default Account;