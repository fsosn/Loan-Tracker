package com.example.loantracker.loansummary.service;

import com.example.loantracker.loansummary.exception.LoanSummaryNotFoundException;
import com.example.loantracker.loansummary.model.LoanSummary;
import com.example.loantracker.loansummary.repository.LoanSummaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanSummaryService {

    private final LoanSummaryRepository loanSummaryRepository;

    public List<LoanSummary> getAllLoanSummaries() {
        return loanSummaryRepository.findAll();
    }

    public void createSummary(Long userId, String email, BigDecimal totalDebt) {
        LoanSummary loanSummary = new LoanSummary(userId, email, totalDebt);
        loanSummaryRepository.save(loanSummary);
    }

    public void addToDebt(Long userId, BigDecimal amountToAdd) {
        LoanSummary existingLoanSummary = loanSummaryRepository.findByUserId(userId);
        if (existingLoanSummary == null) {
            throw new LoanSummaryNotFoundException(userId);
        }

        BigDecimal totalDebt = existingLoanSummary.getTotalDebt();
        existingLoanSummary.setTotalDebt(totalDebt.add(amountToAdd));
        loanSummaryRepository.save(existingLoanSummary);
    }

    public void subtractFromDebt(Long userId, BigDecimal amountToSubtract) {
        LoanSummary existingLoanSummary = loanSummaryRepository.findByUserId(userId);
        if (existingLoanSummary == null) {
            throw new LoanSummaryNotFoundException(userId);
        }

        BigDecimal totalDebt = existingLoanSummary.getTotalDebt();
        if (totalDebt.compareTo(amountToSubtract) < 0) {
            throw new IllegalArgumentException("Amount to subtract exceeds the total debt.");
        }

        existingLoanSummary.setTotalDebt(totalDebt.subtract(amountToSubtract));
        loanSummaryRepository.save(existingLoanSummary);
    }

    private String getCurrentUserEmail() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getUsername();
    }
}
