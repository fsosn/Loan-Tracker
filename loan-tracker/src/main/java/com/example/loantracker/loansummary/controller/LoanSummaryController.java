package com.example.loantracker.loansummary.controller;

import com.example.loantracker.loansummary.model.LoanSummary;
import com.example.loantracker.loansummary.service.LoanSummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.loans.base}")
@RequiredArgsConstructor
public class LoanSummaryController {

    private final LoanSummaryService loanSummaryService;

    @GetMapping("${api.loans.get.summary}")
    public ResponseEntity<List<LoanSummary>> getAllLoanSummaries() {
        List<LoanSummary> loanSummaries = loanSummaryService.getAllLoanSummaries();
        return ResponseEntity.ok(loanSummaries);
    }
}
