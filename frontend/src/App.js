import {Route, Routes} from "react-router-dom";
import './styles.css'
import {RequireAuth} from "./auth/RequireAuth.js";
import LoginForm from "./components/auth/login/LoginForm.js";
import RegisterForm from "./components/auth/register/RegisterForm.js";
import LoansLentPage from "./pages/LoansLentPage.js";
import LoansBorrowedPage from "./pages/LoansBorrowedPage.js";
import UsersPage from "./pages/UsersPage.js";
import LoanAdd from "./components/add-form/LoanAdd.js";
import LoansRequestsPage from "./pages/LoansRequestsPage.js";
import AccountPage from "./pages/AccountPage.js";
import ChangePasswordForm from "./components/auth/change-password-form/ChangePasswordForm.js";
import ForgotPasswordForm from "./components/auth/forgot-password/ForgotPasswordForm.js";
import ResetPasswordForm from "./components/auth/reset-password/ResetPasswordForm.js";

function App() {
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
            <Route path='/forgot-password' element={<ForgotPasswordForm/>}/>
            <Route path='/reset-password' element={<ResetPasswordForm/>}/>
        </Routes>
    );
}

export default App
