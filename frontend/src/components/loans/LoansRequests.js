import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import api from "../../services/api.js";
import Spinner from "../spinner/Spinner.js";

const LoansRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            setLoading(true)
            const loans = await api.fetchRequests();
            setRequests(loans);
        } catch (error) {
            console.error('Error fetching requests:', error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleConfirm = async (loanId) => {
        try {
            const confirmationResult = await api.handleConfirm(loanId);

            if (confirmationResult) {
                const updatedRequests = await api.fetchRequests();
                setRequests(updatedRequests);
            }
        } catch (error) {
            console.error('Error handling loan confirmation:', error);
        }
    };

    return (
        <div>
            <div className={"mt-3"}>
                <button onClick={fetchRequests} className="btn btn-secondary">
                    <FontAwesomeIcon icon={faRotateRight} className={"margin-right-4"}/>{' '}
                    Refresh
                </button>
            </div>
            {loading ? (
                <Spinner/>
            ) : (requests.length > 0 ? (
                    <div>
                        <table className="table mt-3 table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Lender</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {requests.map((loan) => (
                                <tr key={loan.id}>
                                    <td>{loan.title}</td>
                                    <td>{loan.lenderEmail}</td>
                                    <td>{loan.amount}</td>
                                    <td>{loan.dueDate}</td>
                                    <td>
                                        {!loan.confirmed && (
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleConfirm(loan.id)}
                                            >
                                                Confirm
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>) : (
                    <div className="mt-4">You don&apos;t have any loan requests currently.</div>
                )
            )}
        </div>
    )

}

export default LoansRequests