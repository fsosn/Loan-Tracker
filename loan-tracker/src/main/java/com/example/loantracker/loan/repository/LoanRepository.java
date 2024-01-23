package com.example.loantracker.loan.repository;

import com.example.loantracker.loan.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findAllByBorrowerId(Long borrowerId);

    List<Loan> findAllByUserId(Long userId);

    List<Loan> findAllByBorrowerIdAndConfirmedIsFalse(Long borrowerId);

    List<Loan> findAllByBorrowerIdAndConfirmedIsTrue(Long borrowerId);
}

