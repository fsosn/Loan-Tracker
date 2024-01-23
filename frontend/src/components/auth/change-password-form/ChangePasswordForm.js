import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';  // Make sure to import axios
import validate from '../utils/validate';
import Cookies from "js-cookie";

const ChangePasswordForm = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const authToken = Cookies.get('JWT_TOKEN');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate(oldPassword) || !validate(newPassword) || newPassword !== repeatPassword) {
            alert('Invalid password format or passwords do not match');
            return;
        }

        const changePasswordRequest = {
            oldPassword,
            newPassword,
        };

        axios.post("https://127.0.0.1:8443/api/auth/change-password", changePasswordRequest, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                alert(response.data.message);
                if(!response.data.success) return
                navigate('/account');
            })
            .catch(error => {
                console.error('Error changing password:', error);
            });
    };

    return (
        <div className="container">
            <div className="row h-100 justify-content-center">
                <div className="col-sm-5">
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
                                    <button
                                        type="submit"
                                        className="btn btn-block d-grid gap-2 col-6 mx-auto sign-button"
                                    >
                                        Change Password
                                    </button>
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
