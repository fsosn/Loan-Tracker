import {useEffect, useState} from "react";
import api from "../../services/api.js";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faRotateRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../spinner/Spinner.js";

const LoansLent = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const navigateToAddLoan = () => {
        navigate('/loan/add');
    };

    const fetchLentLoans = async () => {
        try {
            setLoading(true)
            const loans = await api.fetchLentLoans();
            setLoans(loans);
        } catch (error) {
            console.error('Error fetching borrowed loans:', error.message);
        } finally {
            setLoading(false)
        }
    };

    const handleDeleteLoan = async (loanId) => {
        console.log(loanId)
        try {
            await api.deleteLoan(loanId);
            fetchLentLoans();
        } catch (error) {
            console.error('Error deleting loan:', error);
            console.error('Error stack trace:', error.stack);
        }
    };

    useEffect(() => {
        fetchLentLoans();
    }, []);

    return (
        <div className={"page-content vh-100"}>
            <div className={"mt-3"}>
                <button onClick={fetchLentLoans} className="btn btn-secondary margin-right-16">
                    <FontAwesomeIcon icon={faRotateRight} className={"margin-right-4"}/>{' '}
                    Refresh
                </button>
                <button
                    className="btn btn-success margin-right-16"
                    onClick={navigateToAddLoan}
                >
                    <FontAwesomeIcon icon={faAdd} className={"margin-right-4"}/>{' '}
                    Add
                </button>
            </div>

            {loading ? (
                <Spinner/>
            ) : (loans.length > 0 ? (
                    <table className="table mt-3 table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Borrower</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Confirmed</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {loans.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.title}</td>
                                <td>{loan.borrowerEmail}</td>
                                <td>{loan.amount}</td>
                                <td>{loan.dueDate}</td>
                                <td>{loan.confirmed ? 'Yes' : 'No'}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteLoan(loan.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>) : (
                    <div className="mt-4">
                        <div>You haven&apos;t lent to any users yet.</div>
                        <div>Click Add to create a loan.</div>
                    </div>
                )
            )}
        </div>
    )
}

export default LoansLent;