package com.example.loantracker.security.password_reset;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByEmailAndToken(String email, String token);

    void deleteByToken(String token);

    Optional<Object> findByEmail(String userEmail);

    void deleteByEmail(String userEmail);
}
