package com.example.loantracker.security.auth.util;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomPasswordEncoder implements PasswordEncoder {

    private static final int LOG_ROUNDS = 12;
    private static final BCryptPasswordEncoder bcryptEncoder = new BCryptPasswordEncoder(LOG_ROUNDS);

    @Override
    public String encode(CharSequence rawPassword) {
        return BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt(LOG_ROUNDS));
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return bcryptEncoder.matches(rawPassword.toString(), encodedPassword);
    }
}
