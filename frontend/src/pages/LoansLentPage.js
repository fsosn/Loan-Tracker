import Page from "./template/Page.js";
import "../styles.css";
import LoansLent from "../components/loans/LoansLent.js";

function LoansLentPage() {
    return (
        <Page pageTitle={"Lent"}>
            <LoansLent/>
        </Page>
    );
}

export default LoansLentPage;
