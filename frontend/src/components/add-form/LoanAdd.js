import {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../../auth/AuthContext.js";
import api from "../../services/api.js";

const LoanAdd = () => {
    const navigate = useNavigate();
    const [loan, setLoan] = useState({
        title: '',
        amount: '',
        dueDate: '',
        confirmed: false,
        borrowerEmail: ''
    });
    const [users, setUsers] = useState([]);
    const auth = useContext(AuthContext);
    const user = auth.user;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await api.fetchAllUsers();
                const filteredUsers = data.filter((email) => email !== user);
                setUsers(filteredUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'amount' && !/^\d*\.?\d*$/.test(value)) {
            return;
        }

        setLoan((prevLoan) => ({...prevLoan, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const loanRequestDto = {
                title: loan.title,
                borrowerEmail: loan.borrowerEmail,
                amount: parseFloat(loan.amount),
                dueDate: loan.dueDate,
            };

            await api.createLoan(loanRequestDto);

            navigate('/');
        } catch (error) {
            console.error('Error:', error);
            if (error.response.data) {
                alert(error.response.data)
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="col-auto">
                    <div className="card">
                        <div className="card-header form-header text-center">
                            <h3>Add Loan</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="form-font">
                                <div className="row mb-3">
                                    <label htmlFor="title" className="col-md-6 col-form-label text-end form-font">
                                        Title
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={loan.title}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="amount" className="col-md-6 col-form-label text-end form-font">
                                        Amount
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            value={loan.amount}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="dueDate" className="col-md-6 col-form-label text-end form-font">
                                        Due Date
                                    </label>
                                    <div className="col-md-6">
                                        <input
                                            type="date"
                                            name="dueDate"
                                            id="dueDate"
                                            value={loan.dueDate}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="borrowerEmail"
                                           className="col-md-6 col-form-label text-end form-font">
                                        Borrower
                                    </label>
                                    <div className="col-md-6">
                                        <select
                                            name="borrowerEmail"
                                            id="borrowerEmail"
                                            value={loan.borrowerEmail}
                                            onChange={handleChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Borrower</option>
                                            {users.map((email) => (
                                                <option key={email} value={email}>
                                                    {email}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row justify-content-center text-center">
                                    <div className="col-6">
                                        <button type="submit" className="btn btn-block btn-success">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/')}
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

export default LoanAdd;
