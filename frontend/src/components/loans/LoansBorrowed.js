import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api.js"
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner.js";

const LoansBorrowed = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBorrowedLoans = async () => {
        try {
            setLoading(true)
            const loans = await api.fetchBorrowedLoans();
            setLoans(loans);
        } catch (error) {
            console.error('Error fetching borrowed loans:', error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchBorrowedLoans();
    }, []);

    return (
        <div className={"page-content vh-100"}>
            <div className={"mt-3"}>
                <button onClick={fetchBorrowedLoans} className="btn btn-secondary">
                    <FontAwesomeIcon icon={faRotateRight} className={"margin-right-4"}/>{' '}
                    Refresh
                </button>
            </div>
            {loading ? (
                <Spinner/>
            ) : (loans.length > 0 ? (
                    <div>
                        <table className="table mt-3 table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Lender</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td>{loan.title}</td>
                                    <td>{loan.lenderEmail}</td>
                                    <td>{loan.amount}</td>
                                    <td>{loan.dueDate}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>) : (
                    <div className="mt-4">You haven&apos;t borrowed from any users yet.</div>
                )
            )}
        </div>)
}

export default LoansBorrowed