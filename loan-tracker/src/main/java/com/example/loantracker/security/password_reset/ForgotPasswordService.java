package com.example.loantracker.security.password_reset;

import com.example.loantracker.security.auth.validation.AuthValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ForgotPasswordService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final JavaMailSender mailSender;

    private String generateResetToken(String userEmail) {
        String resetToken = UUID.randomUUID().toString();

        LocalDateTime expiryDateTime = LocalDateTime.now().plusMinutes(15);
        PasswordResetToken passwordResetToken = new PasswordResetToken(userEmail, resetToken, expiryDateTime);

        if (passwordResetTokenRepository.findByEmail(userEmail).isPresent()) {
            passwordResetTokenRepository.deleteByEmail(userEmail);
        }

        passwordResetTokenRepository.save(passwordResetToken);

        return resetToken;
    }

    public void sendResetTokenByEmail(String userEmail) {
        try {
            if (!AuthValidationUtil.isEmailValid(userEmail)) {
                throw new RuntimeException("Invalid email." +
                        " Please provide a valid email address (e.g., user@example.com).");
            }
            SimpleMailMessage message = new SimpleMailMessage();
            String resetToken = generateResetToken(userEmail);
            message.setTo(userEmail);
            message.setSubject("Password Reset");
            message.setText("Use the following token to reset your password: " + resetToken);

            mailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

    public boolean verifyResetToken(String userEmail, String token) {
        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByEmailAndToken(userEmail, token);

        return passwordResetToken != null && LocalDateTime.now().isBefore(passwordResetToken.getExpiryDateTime());
    }
}
