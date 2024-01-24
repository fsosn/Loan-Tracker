import {useState, useEffect} from 'react';
import Page from "./template/Page.js";
import "../styles.css";
import {useNavigate} from 'react-router-dom';
import {faAdd, faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

function LoansLentPage() {
    const navigate = useNavigate();
    const [loans, setLoans] = useState([]);

    const fetchLoans = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8443/api/loans/get/all/lent', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setLoans(response.data);
            } else {
                console.error('Error fetching loans:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching loans:', error);
        }
    };

    useEffect(() => {
        fetchLoans();
    }, []);


    const navigateToAddLoan = () => {
        navigate('/loan/add');
    };

    return (
        <Page pageTitle={"Lent"}>
            <div className={"page-content vh-100"}>
                <div className={"mt-3"}>
                    <button onClick={fetchLoans} className="btn btn-secondary margin-right-16">
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
                <div>
                    <table className="table mt-3 table-hover table-responsive">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Borrower</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Confirmed</th>
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
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Page>
    );
}

export default LoansLentPage;
