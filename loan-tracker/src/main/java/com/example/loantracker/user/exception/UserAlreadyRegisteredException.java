package com.example.loantracker.user.exception;

public class UserAlreadyRegisteredException extends RuntimeException {

    public UserAlreadyRegisteredException(String email) {
        super("Provided email address (" + email + ") is already registered.");
    }
}
