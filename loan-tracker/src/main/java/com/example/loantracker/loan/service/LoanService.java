package com.example.loantracker.loan.service;

import com.example.loantracker.loan.dto.LoanDto;
import com.example.loantracker.loan.dto.LoanRequestDto;
import com.example.loantracker.loan.model.Loan;
import com.example.loantracker.loan.repository.LoanRepository;
import com.example.loantracker.loansummary.model.LoanSummary;
import com.example.loantracker.loansummary.repository.LoanSummaryRepository;
import com.example.loantracker.loansummary.service.LoanSummaryService;
import com.example.loantracker.user.model.User;
import com.example.loantracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final LoanSummaryRepository loanSummaryRepository;
    private final LoanSummaryService loanSummaryService;

    public List<LoanDto> getAllUserLoansLent() {
        List<Loan> allUserLoansLent = loanRepository.findAllByUserId(getCurrentUserId());

        return allUserLoansLent.stream()
                .map(this::mapToLoanDto)
                .collect(Collectors.toList());
    }

    public List<LoanRequestDto> getAllUserLoansBorrowed() {
        List<Loan> allUserLoansBorrowed = loanRepository.findAllByBorrowerIdAndConfirmedIsTrue(getCurrentUserId());

        return allUserLoansBorrowed.stream()
                .map(this::mapToLoanRequestDto)
                .collect(Collectors.toList());
    }

    public List<LoanRequestDto> getAllUserLoanRequests() {
        List<Loan> allLoanRequests = loanRepository.findAllByBorrowerIdAndConfirmedIsFalse(getCurrentUserId());

        return allLoanRequests.stream()
                .map(this::mapToLoanRequestDto)
                .collect(Collectors.toList());
    }

    public Loan createLoan(LoanDto loanDto) {
        String title = loanDto.getTitle();
        String borrowerEmail = loanDto.getBorrowerEmail();
        BigDecimal amount = loanDto.getAmount();
        LocalDate dueDate = loanDto.getDueDate();
        Long borrowerId = userRepository.findByEmail(borrowerEmail).get().getId();

        Loan loan = new Loan(title, borrowerId, amount, dueDate);
        loan.setUserId(getCurrentUserId());

        return loanRepository.save(loan);
    }

    public void confirmLoan(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found with id: " + loanId));

        if (!Objects.equals(loan.getBorrowerId(), getCurrentUserId())) {
            throw new RuntimeException("Cannot confirm someone else's loan.");
        }

        LoanSummary loanSummary = loanSummaryRepository.findByUserId(loan.getBorrowerId());
        if (loanSummary == null) {
            loanSummaryService.createSummary(loan.getBorrowerId(), getCurrentUserEmail(), loan.getAmount());
        } else {
            loanSummaryService.addToDebt(loan.getBorrowerId(), loan.getAmount());
        }
        loan.setConfirmed(true);

        loanRepository.save(loan);
    }

    private Long getCurrentUserId() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(userDetails.getUsername()).orElseThrow().getId();
    }

    private String getCurrentUserEmail() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getUsername();
    }

    private LoanDto mapToLoanDto(Loan loan) {
        return new LoanDto(
                loan.getTitle(),
                userRepository.findById(loan.getBorrowerId()).map(User::getEmail).orElse(null),
                loan.getAmount(),
                loan.getDueDate(),
                loan.getConfirmed()
        );
    }

    private LoanRequestDto mapToLoanRequestDto(Loan loan) {
        return new LoanRequestDto(
                loan.getId(),
                loan.getTitle(),
                userRepository.findById(loan.getUserId()).map(User::getEmail).orElse(null),
                loan.getAmount(),
                loan.getDueDate(),
                loan.getConfirmed()
        );
    }
}

