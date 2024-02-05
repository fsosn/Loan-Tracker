import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import validate from '../utils/validate';
import api from "../../../services/api.js";

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validate(oldPassword) || !validate(newPassword) || newPassword !== repeatPassword) {
            return;
        }

        const changePasswordRequest = {
            oldPassword,
            newPassword,
        };

        try {
            const responseData = await api.changePassword(changePasswordRequest);
            alert(responseData.message);

            if (responseData.success) {
                navigate("/account")
            }
        } catch (error) {
            console.error(error.message);
        }

    };

    return (
        <div className="container-fluid bg-body-tertiary">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-header form-header text-center">
                            <h3>Change Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="oldPassword" className="form-label">
                                        Old Password:
                                    </label>
                                    <input
                                        name="oldPassword"
                                        type="password"
                                        className="form-control"
                                        id="oldPassword"
                                        onChange={handleOldPasswordChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">
                                        New Password:
                                    </label>
                                    <input
                                        name="newPassword"
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        onChange={handleNewPasswordChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="repeatPassword" className="form-label">
                                        Repeat Password:
                                    </label>
                                    <input
                                        name="repeatPassword"
                                        type="password"
                                        className="form-control"
                                        id="repeatPassword"
                                        onChange={handleRepeatPasswordChange}
                                    />
                                </div>
                                <div className="text-center sign-button-container">
                                    <div className="row">
                                        <div className="col">
                                            <button type="submit" className="btn btn-block action-button">
                                                Submit
                                            </button>
                                        </div>
                                        <div className="col">
                                            <button
                                                type="button"
                                                className="btn btn-block bg-primary"
                                                onClick={() => navigate(-1)}
                                            >
                                                Go back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
