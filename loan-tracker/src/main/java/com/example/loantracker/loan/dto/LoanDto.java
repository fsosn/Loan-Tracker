package com.example.loantracker.loan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class LoanDto {
    private Long id;
    private String title;
    private String borrowerEmail;
    private BigDecimal amount;
    private LocalDate dueDate;
    private Boolean confirmed;
}