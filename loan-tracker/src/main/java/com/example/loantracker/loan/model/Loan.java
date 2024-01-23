package com.example.loantracker.loan.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@RequiredArgsConstructor
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "user_id")
    private Long userId;

    @JoinColumn(name = "borrower_id")
    private Long borrowerId;

    private String title;

    private BigDecimal amount;

    private LocalDate dueDate;

    private Boolean confirmed;

    public Loan(String title, Long borrowerId, BigDecimal amount, LocalDate dueDate) {
        this.title = title;
        this.amount = amount;
        this.borrowerId = borrowerId;
        this.dueDate = dueDate;
        this.confirmed = false;
    }
}
