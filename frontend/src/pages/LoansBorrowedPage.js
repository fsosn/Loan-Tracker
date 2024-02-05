import Page from "./template/Page.js";
import "../styles.css";
import LoansBorrowed from "../components/loans/LoansBorrowed.js";

const LoansBorrowedPage = () => {
    return (
        <Page pageTitle={"Borrowed"}>
            <LoansBorrowed/>
        </Page>
    );
}

export default LoansBorrowedPage;
