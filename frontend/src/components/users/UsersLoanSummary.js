import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateRight} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import api from "../../services/api.js";
import Spinner from "../spinner/Spinner.js";

const UsersLoanSummary = () => {
    const [loanSummary, setLoanSummary] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLoanSummary = async () => {
        try {
            setLoading(true)
            const summary = await api.fetchLoanSummary();
            setLoanSummary(summary);
        } catch (error) {
            console.error('Error fetching borrowed loans:', error.message);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchLoanSummary();
    }, []);

    return (
        <div>
            <div className={"pt-3"}>
                <button onClick={fetchLoanSummary} className="btn btn-secondary">
                    <FontAwesomeIcon icon={faRotateRight} className={"margin-right-4"}/>{' '}
                    Refresh
                </button>
            </div>
            {loading ? (
                <Spinner/>
            ) : (loanSummary.length > 0 && (
                <div>
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
                </div>))
            }
        </div>)
}

export default UsersLoanSummary