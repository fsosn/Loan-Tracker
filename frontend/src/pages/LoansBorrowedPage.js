import {useState, useEffect} from 'react';
import Page from "./template/Page.js";
import "../styles.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const LoansBorrowedPage = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8443/api/loans/get/all/borrowed', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setRequests(response.data);
            } else {
                console.error('Error fetching loan requests:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching loan requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

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
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((loan) => (
                            <tr key={loan.id}>
                                <td>{loan.title}</td>
                                <td>{loan.lenderEmail}</td>
                                <td>{loan.amount}</td>
                                <td>{loan.dueDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Page>
    );
}

export default LoansBorrowedPage;
