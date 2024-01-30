package com.example.loantracker.security.auth.validation;


import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

@Component
public class AuthValidationUtil {

    private static final String NAME_PATTERN =
            "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    private static final String EMAIL_PATTERN =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}$";
    private static final String PASSWORD_PATTERN =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,256}$";

    public static boolean isNameValid(String firstName) {
        return firstName != null &&
                !firstName.isBlank() &&
                !firstName.isEmpty() &&
                firstName.length() <= 50 &&
                Pattern.matches(NAME_PATTERN, firstName);
    }

    public static boolean isEmailValid(String email) {
        return email != null &&
                !email.isBlank() &&
                !email.isEmpty() &&
                Pattern.matches(EMAIL_PATTERN, email);
    }

    public static boolean isPasswordValid(String password) {
        return password != null &&
                !password.isBlank() &&
                !password.isEmpty() &&
                Pattern.matches(PASSWORD_PATTERN, password);
    }


    public void validateRegistrationData(String firstName,
                                         String lastName,
                                         String email,
                                         String password) {
        if (!isNameValid(firstName)) {
            throw new RuntimeException("Invalid first name." +
                    " It should contain only letters and may include special characters" +
                    " like apostrophes, commas, dots, spaces, or hyphens.");
        }
        if (!isNameValid(lastName)) {
            throw new RuntimeException("Invalid last name." +
                    " It should contain only letters and may include special characters" +
                    " like apostrophes, commas, dots, spaces, or hyphens.");
        }
        if (!isEmailValid(email)) {
            throw new RuntimeException("Invalid email." +
                    " Please provide a valid email address (e.g., user@example.com).");
        }
        if (!isPasswordValid(password)) {
            throw new RuntimeException("Invalid password." +
                    " It must have a minimum of 8 ASCII characters and contain at least" +
                    " one lowercase letter, one uppercase letter, one digit, and one special character.");
        }
    }

    public void validateLoginData(String email, String password) {
        if (!isEmailValid(email)) {
            throw new RuntimeException("Invalid email." +
                    " Please provide a valid email address (e.g., user@example.com).");
        }
        if (!isPasswordValid(password)) {
            throw new RuntimeException("Invalid password." +
                    " It must have a minimum of 8 ASCII characters and contain at least" +
                    " one lowercase letter, one uppercase letter, one digit, and one special character.");
        }
    }

    public void validateChangePasswordData(String oldPassword, String newPassword){
        if (!isPasswordValid(oldPassword)) {
            throw new RuntimeException("Invalid old password." +
                    " It must have a minimum of 8 ASCII characters and contain at least" +
                    " one lowercase letter, one uppercase letter, one digit, and one special character.");
        }
        if (!isPasswordValid(newPassword)) {
            throw new RuntimeException("Invalid new password." +
                    " It must have a minimum of 8 ASCII characters and contain at least" +
                    " one lowercase letter, one uppercase letter, one digit, and one special character.");
        }
    }
}
