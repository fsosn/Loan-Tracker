import {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../auth/AuthContext.js";
import axios from "axios";

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
        const getUsers = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                };

                const response = await axios.get('https://127.0.0.1:8443/api/users/get/all', {
                    headers: headers,
                });

                if (response.status === 200) {
                    const data = response.data;
                    const filteredUsers = data.filter((email) => email !== user);
                    setUsers(filteredUsers);
                } else {
                    console.error('Error fetching users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'amount' && !/^\d*\.?\d*$/.test(value)) {
            return;
        }

        setLoan((prevLoan) => ({ ...prevLoan, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(loan)

        if (!loan.title.trim()) {
            console.error('Title cannot be empty.');
            return;
        }

        if (isNaN(parseFloat(loan.amount)) || parseFloat(loan.amount) <= 0) {
            console.error('Amount must be a positive number.');
            return;
        }

        if (!loan.dueDate) {
            console.error('Due date cannot be empty.');
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const loanRequestDto = {
                title: loan.title,
                borrowerEmail: loan.borrowerEmail,
                amount: parseFloat(loan.amount),
                dueDate: loan.dueDate,
            };

            const response = await axios.post('https://127.0.0.1:8443/api/loans/create', loanRequestDto, {
                headers: headers,
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log('Loan added successfully');
                navigate('/');
            } else {
                console.error('Error adding loan:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
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
                                    <label htmlFor="borrowerEmail" className="col-md-6 col-form-label text-end form-font">
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
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-end">
                                        <button type="submit" className="btn btn-block btn-success">
                                            Submit
                                        </button>
                                    </div>
                                    <div className="col-md-6">
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
