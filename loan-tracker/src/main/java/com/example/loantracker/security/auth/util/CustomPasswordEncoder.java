package com.example.loantracker.security.auth.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomPasswordEncoder implements PasswordEncoder {

    private static final int LOG_ROUNDS = 12;
    private static final BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(LOG_ROUNDS);

    @Value("${PEPPER}")
    private String pepper;

    @Override
    public String encode(CharSequence rawPassword) {
        String passwordWithPepper = rawPassword + pepper;
        return BCrypt.hashpw(passwordWithPepper, BCrypt.gensalt(LOG_ROUNDS));
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        String passwordWithPepper = rawPassword + pepper;
        return bcryptEncoder.matches(passwordWithPepper, encodedPassword);
    }
}
