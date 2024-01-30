import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {API_ENDPOINTS} from "../../../config/config.js";
import validate from "../utils/validate.js";
import PasswordStrength from "../password-strength/PasswordStrength.js";
import axios from "axios";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (repeatPassword !== password) {
            setRepeatPasswordError('Passwords do not match.');
            return;
        } else {
            setRepeatPasswordError('');
        }

        if (!validate(password)) return

        const userData = {
            firstName,
            lastName,
            email,
            password,
        };

        try {
            const response = await axios.post(
                API_ENDPOINTS.BASE_URL +
                API_ENDPOINTS.API +
                API_ENDPOINTS.AUTH +
                API_ENDPOINTS.REGISTER,
                userData,
            );
            alert(response.data.message);
            if(response.data.success === true){
                navigate("/login");
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const calculatePasswordEntropy = (password) => {
        const characterSetSize = 95;
        const passwordLength = password.length;

        const entropy = Math.log2(Math.pow(characterSetSize, passwordLength));

        return Math.round(entropy);
    };

    return (
        <div className="container-fluid bg-body-tertiary">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-header text-center form-header">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        First name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">
                                        Last name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-mail:
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${registrationError ? 'is-invalid' : ''}`}
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {registrationError && (
                                        <div className="invalid-feedback form-label-extras">
                                            {registrationError}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <PasswordStrength entropy={calculatePasswordEntropy(password)}/>
                                <div className="mb-3">
                                    <label htmlFor="repeatPassword" className="form-label">
                                        Confirm password:
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${repeatPasswordError ? 'is-invalid' : ''}`}
                                        id="repeatPassword"
                                        value={repeatPassword}
                                        onChange={(e) => setRepeatPassword(e.target.value)}
                                    />
                                    {repeatPasswordError && (
                                        <div className="invalid-feedback form-label-extras">
                                            {repeatPasswordError}
                                        </div>
                                    )}
                                </div>
                                <div className="text-center sign-button-container">
                                    <button type="submit"
                                            className="btn btn-block d-grid gap-2 col-6 mx-auto sign-button">
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center form-label-extras">
                                <p>
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-decoration-none href-color">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;