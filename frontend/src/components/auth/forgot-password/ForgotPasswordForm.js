import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from "../../../services/api.js";

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.sendForgotPasswordRequest(email);
            navigate('/reset-password');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div className="container-fluid bg-body-tertiary">
            <div className="row h-100 d-flex align-items-center justify-content-center">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-header form-header text-center">
                            <h3>Forgot Password</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        E-mail:
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-end">
                                        <button type="submit" className="btn btn-block btn-success">
                                            Send
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

export default ForgotPasswordForm;
