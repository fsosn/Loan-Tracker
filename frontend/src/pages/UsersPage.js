import Page from "./template/Page.js";
import "../styles.css";
import UsersLoanSummary from "../components/users/UsersLoanSummary.js";

const UsersPage = () => {
    return (
        <Page pageTitle={"Users"}>
            <div className={"page-content vh-100"}>
                <UsersLoanSummary/>
            </div>
        </Page>
    );
}

export default UsersPage;
