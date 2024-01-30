import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import validate from '../utils/validate';

const ResetPasswordForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate(password) || password !== repeatPassword) {
            return;
        }

        const changePasswordRequest = {
            email,
            token,
            password,
        };

        axios.post("https://127.0.0.1:8443/api/auth/reset-password", changePasswordRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(() => {
                navigate('/');
            })
            .catch(error => {
                console.error('Error changing password:', error);
            });
    };

    return (
        <div className="container-fluid bg-body-tertiary">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-header form-header text-center">
                            <h3>Reset Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email:
                                    </label>
                                    <input
                                        name="email"
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="token" className="form-label">
                                        Token:
                                    </label>
                                    <input
                                        name="token"
                                        type="text"
                                        className="form-control"
                                        id="token"
                                        onChange={handleTokenChange}
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
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-end">
                                        <button type="submit" className="btn btn-block btn-success">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button
                                            type="button"
                                            onClick={() => navigate(-1)}
                                            className="btn btn-block btn-primary"
                                        >
                                            Go back
                                        </button>
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

export default ResetPasswordForm;
