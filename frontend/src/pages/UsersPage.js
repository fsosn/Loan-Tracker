import Page from "./template/Page.js";
import {useEffect, useState} from "react";
import "../styles.css";
import "./UsersPage.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const UsersPage = () => {
    const [loanSummary, setLoanSummary] = useState([]);

    const getSummary = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };

            const response = await axios.get('https://127.0.0.1:8443/api/loans/get/summary', {
                headers: headers,
            });

            if (response.status === 200) {
                setLoanSummary(response.data);
            } else {
                console.error('Error fetching summary:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
    };

    useEffect(() => {
        getSummary();
    }, []);

    return (
        <Page pageTitle={"Users"}>
            <div className={"page-content vh-100"}>
                <div className={"pt-3"}>
                    <button onClick={getSummary} className="btn btn-secondary">
                        <FontAwesomeIcon icon={faRotateRight} className={"margin-right-4"}/>{' '}
                        Refresh
                    </button>
                </div>
                {loanSummary.length > 0 && (
                    <table className="table mt-3 table-hover table-responsive">
                        <thead>
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Total Debt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loanSummary.map((summary) => (
                            <tr key={summary.id}>
                                <td>{summary.email}</td>
                                <td>{summary.totalDebt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Page>
    );
}

export default UsersPage;
