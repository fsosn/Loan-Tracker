import Page from "./template/Page.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faKey } from "@fortawesome/free-solid-svg-icons/faKey";
import axios from "axios";
import { useState, useEffect } from 'react';

const FailedLoginAttemptsTable = () => {
    const [failedAttempts, setFailedAttempts] = useState([]);

    const fetchFailedAttempts = async () => {
        try {
            const response = await axios.get('https://127.0.0.1:8443/api/failed-login-attempts', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const formattedFailedAttempts = response.data.map(attempt => ({
                    ...attempt,
                    timestamp: new Date(attempt.timestamp).toLocaleString()
                }));
                setFailedAttempts(formattedFailedAttempts);
            } else {
                console.error('Error fetching failed login attempts:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching failed login attempts:', error);
        }
    };

    useEffect(() => {
        fetchFailedAttempts();
    }, []);

    return (
        <div><h2>Failed login attempts:</h2>
            <table className="table mt-3 table-hover table-responsive">
                <thead>
                <tr>
                    <th>When</th>
                    <th>IP</th>
                </tr>
                </thead>
                <tbody>
                {failedAttempts.map((attempt) => (
                    <tr key={attempt.id}>
                        <td>{attempt.timestamp}</td>
                        <td>{attempt.ipAddress}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const AccountPage = () => {
    const navigate = useNavigate();

    return (
        <Page pageTitle={"Account"}>
            <div className={"page-content vh-100"}>
                <div className={"pt-3 pb-5"}>
                    <button onClick={() => navigate("/change-password")} className="btn btn-secondary">
                        <FontAwesomeIcon icon={faKey} className={"margin-right-4"} /> Change password
                    </button>
                </div>
                <FailedLoginAttemptsTable />
            </div>
        </Page>
    );
};

export default AccountPage;
