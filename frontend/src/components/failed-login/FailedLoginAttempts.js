import api from '../../services/api.js';
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner.js";

const FailedLoginAttempts = () => {
    const [failedAttempts, setFailedAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFailedAttempts = async () => {
            try {
                setLoading(true)
                const attempts = await api.fetchFailedLoginAttempts();
                setFailedAttempts(attempts);
            } catch (error) {
                console.error('Error fetching failed login attempts:', error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchFailedAttempts();
    }, []);

    return (
        <div>
            {loading ? (
                <Spinner/>
            ) : (failedAttempts.length > 0 && (
                <div>
                    <h2>Failed login attempts</h2>
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
                </div>))
            }
        </div>
    );
};

export default FailedLoginAttempts;