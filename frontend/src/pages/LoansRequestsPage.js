import {useState, useEffect} from 'react';
import Page from "./template/Page.js";
import "../styles.css";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";

function LoansRequestsPage() {
    const [requests, setRequests] = useState([]);
    const xsrfToken = Cookies.get('XSRF_TOKEN');
    const authToken = Cookies.get('JWT_TOKEN');

    const fetchRequests = async () => {
        try {
            const response = await fetch("https://127.0.0.1:8443/api/loans/get/all/requests", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                    'Authorization': `Bearer ${authToken}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data);
                console.log(data)
            } else {
                console.error("Error fetching loan requests:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching loan requests:", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleConfirm = async (loanId) => {
        console.log(loanId)
        try {
            const response = await fetch(`https://127.0.0.1:8443/api/loans/confirm?loanId=${loanId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': xsrfToken,
                    'Authorization': `Bearer ${authToken}`
                },
            });

            if (response.ok) {
                await fetchRequests();
                console.log('Loan confirmed successfully');
            } else {
                console.error("Error confirming loan:", response.statusText);
            }
        } catch (error) {
            console.error("Error confirming loan:", error);
        }
    };

    return (
        <Page pageTitle={"Requests"}>
            <div className={"page-content vh-100"}>
                <div className={"mt-3"}>
                    <button onClick={fetchRequests} className="btn btn-secondary">
                        <FontAwesomeIcon icon={faRotateRight} className={"margin-right-4"}/>{' '}
                        Refresh
                    </button>
                </div>
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
                                            className="btn btn-primary"
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
                </div>
            </div>
        </Page>
    );
}

export default LoansRequestsPage;
