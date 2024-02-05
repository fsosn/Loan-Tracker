import Page from "./template/Page.js";
import "../styles.css";
import LoansRequests from "../components/loans/LoansRequests.js";

const LoansRequestsPage = () => {
    return (
        <Page pageTitle={"Requests"}>
            <div className={"page-content vh-100"}>
                <LoansRequests/>
            </div>
        </Page>
    );
}

export default LoansRequestsPage;
