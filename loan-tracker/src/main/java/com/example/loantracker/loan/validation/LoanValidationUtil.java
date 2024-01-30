package com.example.loantracker.loan.validation;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.regex.Pattern;

@Component
public class LoanValidationUtil {

    private static final String TITLE_PATTERN = "^[\\p{L}0-9\\s.,!?()-]{1,50}$";
    private static final String AMOUNT_PATTERN = "^\\d{1,50}(\\.\\d{1,2})?$";
    private static final String DATE_PATTERN = "^(202[4-9]|20[3-9]\\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";
    private static final String EMAIL_PATTERN =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$";

    public static boolean isTitleValid(String title) {
        return title != null && Pattern.matches(TITLE_PATTERN, title);
    }

    public static boolean isBorrowerEmailValid(String borrowerEmail) {
        return borrowerEmail != null && Pattern.matches(EMAIL_PATTERN, borrowerEmail);
    }

    public static boolean isAmountValid(BigDecimal amount) {
        return amount != null && (!amount.equals(BigDecimal.ZERO))
                && Pattern.matches(AMOUNT_PATTERN, amount.toString());
    }

    public static boolean isDateValid(LocalDate date) {
        return date != null && Pattern.matches(DATE_PATTERN, date.toString());
    }

    public void validateLoanData(String title, String borrowerEmail, BigDecimal amount, LocalDate dueDate) {
        if (!isTitleValid(title)) {
            throw new RuntimeException("Invalid loan title." +
                    " It should contain only letters, digits, or spaces and have a maximum length of 50 characters.");
        }
        if (!isBorrowerEmailValid(borrowerEmail)) {
            throw new RuntimeException("Invalid borrower email." +
                    " Please provide a valid email address (e.g., user@example.com).");
        }
        if (!isAmountValid(amount)) {
            throw new RuntimeException("Invalid loan amount." +
                    " It should be a non-negative and non-zero number with up to two decimal places.");
        }
        if (!isDateValid(dueDate)) {
            throw new RuntimeException("Invalid due date." +
                    " It should be in the format yyyy-mm-dd.");
        }
    }
}
