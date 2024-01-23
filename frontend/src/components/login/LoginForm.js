import './LoginForm.css';
import {useContext} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../auth/AuthContext.js";


const LoginForm = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const password = formData.get("password");

        auth.signIn(username, password, () => {
            navigate(from, {replace: true});
        });
    }

    return (
        <div className="container">
            <div className="row h-100 justify-content-center">
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-header form-header text-center">
                            <h3>Sign In</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        E-mail:
                                    </label>
                                    <input
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        id="username"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        id="password"
                                    />
                                </div>
                                <div className="text-center sign-button-container">
                                    <button type="submit"
                                            className="btn btn-block d-grid gap-2 col-6 mx-auto sign-button">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                            <div className="mt-3 text-center form-label-extras">
                                <p>Don't have an account?</p>
                                <Link to="/register" className="text-decoration-none href-color">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;