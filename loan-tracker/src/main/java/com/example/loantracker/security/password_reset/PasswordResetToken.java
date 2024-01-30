package com.example.loantracker.security.password_reset;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@RequiredArgsConstructor
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiryDateTime;

    public PasswordResetToken(String email, String token, LocalDateTime expiryDateTime) {
        this.email = email;
        this.token = token;
        this.expiryDateTime = expiryDateTime;
    }
}