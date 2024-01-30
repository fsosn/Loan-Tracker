package com.example.loantracker.loan.controller;

import com.example.loantracker.loan.dto.LoanDto;
import com.example.loantracker.loan.dto.LoanRequestDto;
import com.example.loantracker.loan.model.Loan;
import com.example.loantracker.loan.service.LoanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.loans.base}")
@CrossOrigin(origins = {"${frontend}"}, allowCredentials = "true")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @GetMapping("${api.loans.get.all.borrowed}")
    public ResponseEntity<List<LoanRequestDto>> getAllLoansBorrowed() {
        List<LoanRequestDto> loans = loanService.getAllUserLoansBorrowed();
        return ResponseEntity.ok(loans);
    }

    @GetMapping("${api.loans.get.all.lent}")
    public ResponseEntity<List<LoanDto>> getUserLoansLent() {
        List<LoanDto> loans = loanService.getAllUserLoansLent();
        return ResponseEntity.ok(loans);
    }

    @GetMapping("${api.loans.get.all.requests}")
    public ResponseEntity<List<LoanRequestDto>> getUserLoanRequests() {
        List<LoanRequestDto> loans = loanService.getAllUserLoanRequests();
        return ResponseEntity.ok(loans);
    }

    @PostMapping("${api.loans.create}")
    public ResponseEntity<?> createLoan(@RequestBody LoanDto loanDto) {
        try {
            Loan createdLoan = loanService.createLoan(loanDto);
            return ResponseEntity.ok(createdLoan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("${api.loans.confirm}")
    public ResponseEntity<Void> confirmLoan(@RequestParam Long loanId) {
        loanService.confirmLoan(loanId);
        return ResponseEntity.noContent().build();
    }

//    @PutMapping("${api.loans.update}")
//    public ResponseEntity<Loan> updateLoan(@Valid @RequestBody Loan newLoan, @RequestParam Long id) {
//        Loan updatedLoan = loanService.updateDebt(id, newLoan);
//        return ResponseEntity.ok(updatedLoan);
//    }

//    @DeleteMapping("${api.loans.delete}")
//    public ResponseEntity<Void> deleteLoan(@RequestParam Long id) {
//        loanService.deleteLoan(id);
//        return ResponseEntity.noContent().build();
//    }
}
