package com.example.loantracker.loansummary.exception;

public class LoanSummaryNotFoundException extends RuntimeException {
    public LoanSummaryNotFoundException(Long id){
        super("Could not find loan summary for user with id:" + id);
    }
}
