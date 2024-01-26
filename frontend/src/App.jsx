import {Route, Routes} from "react-router-dom";
import './styles.css'
import {RequireAuth} from "./auth/RequireAuth.js";
import LoginForm from "./components/auth/login/LoginForm.js";
import RegisterForm from "./components/auth/register/RegisterForm.js";
import {useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {API_ENDPOINTS} from "./config/config.js";
import LoansLentPage from "./pages/LoansLentPage.js";
import LoansBorrowedPage from "./pages/LoansBorrowedPage.js";
import UsersPage from "./pages/UsersPage.js";
import LoanAdd from "./components/add-form/LoanAdd.js";
import LoansRequestsPage from "./pages/LoansRequestsPage.js";
import AccountPage from "./pages/AccountPage.js";
import ChangePasswordForm from "./components/auth/change-password-form/ChangePasswordForm.js";

function App() {

    useEffect(() => {
        const fetchXSRFToken = async () => {
            try {
                const response = await axios.get(
                    API_ENDPOINTS.BASE_URL +
                    API_ENDPOINTS.API +
                    API_ENDPOINTS.AUTH +
                    API_ENDPOINTS.XSRF, {withCredentials: true}
                );
                const xsrfToken = response.headers['x-xsrf-token'];
                console.log(xsrfToken)
                axios.defaults.headers.common['X-CSRF-TOKEN'] = xsrfToken;
                Cookies.set('XSRF_TOKEN', xsrfToken, {expires: 3600});
            } catch (error) {
                console.error('Failed to fetch XSRF token:', error);
            }
        };

        fetchXSRFToken();
    }, []);

    return (
        <Routes>
            <Route index path='/' element={<RequireAuth><LoansLentPage/></RequireAuth>}/>
            <Route path='/borrowed' element={<RequireAuth><LoansBorrowedPage/></RequireAuth>}/>
            <Route path='/requests' element={<RequireAuth><LoansRequestsPage/></RequireAuth>}/>
            <Route path='/loan/add' element={<RequireAuth><LoanAdd/></RequireAuth>}/>
            <Route path='/users' element={<RequireAuth><UsersPage/></RequireAuth>}/>
            <Route path='/account' element={<RequireAuth><AccountPage/></RequireAuth>}/>
            <Route path='/change-password' element={<RequireAuth><ChangePasswordForm/></RequireAuth>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<RegisterForm/>}/>
        </Routes>

    );
}

export default App
