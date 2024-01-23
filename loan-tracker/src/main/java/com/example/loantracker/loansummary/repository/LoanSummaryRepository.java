package com.example.loantracker.loansummary.repository;

import com.example.loantracker.loansummary.model.LoanSummary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanSummaryRepository extends JpaRepository<LoanSummary, Long> {
    LoanSummary findByUserId(Long userId);
}


