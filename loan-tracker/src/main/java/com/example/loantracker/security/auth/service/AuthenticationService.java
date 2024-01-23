package com.example.loantracker.security.auth.service;

import com.example.loantracker.loansummary.service.LoanSummaryService;
import com.example.loantracker.security.auth.request.AuthenticationRequest;
import com.example.loantracker.security.auth.request.RegisterRequest;
import com.example.loantracker.security.auth.response.AuthenticationResponse;
import com.example.loantracker.security.auth.response.RegisterResponse;
import com.example.loantracker.security.jwt.JwtService;
import com.example.loantracker.user.exception.UserAlreadyRegisteredException;
import com.example.loantracker.user.model.Role;
import com.example.loantracker.user.model.User;
import com.example.loantracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final LoanSummaryService loanSummaryService;

    private static final String PASSWORD_PATTERN =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+])[A-Za-z\\d!@#$%^&*()_+]{8,}$";
    private static final Pattern PASSWORD_REGEX = Pattern.compile(PASSWORD_PATTERN);

    private boolean validatePassword(String password) {
        return PASSWORD_REGEX.matcher(password).matches();
    }

    public RegisterResponse register(RegisterRequest request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new UserAlreadyRegisteredException(request.getEmail());
            }

            if (!validatePassword(request.getPassword())) {
                return RegisterResponse.builder()
                        .message("Password must have 8 letters and" +
                                " contain at least one lowercase letter," +
                                " one uppercase letter, one digit, and one special character")
                        .success(false)
                        .build();
            }

            var user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            User savedUser = userRepository.save(user);

            loanSummaryService.createSummary(savedUser.getId(), savedUser.getEmail(), BigDecimal.ZERO);

            return RegisterResponse.builder()
                    .message("Successfully registered account with email: " + request.getEmail())
                    .success(true)
                    .build();
        } catch (UserAlreadyRegisteredException e) {
            return RegisterResponse.builder()
                    .message(e.getMessage())
                    .success(false)
                    .build();
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        if (!validatePassword(request.getPassword())) {
            return AuthenticationResponse.builder()
                    .token(null)
                    .message("Password must have 8 letters and" +
                            " contain at least one lowercase letter," +
                            " one uppercase letter, one digit, and one special character")
                    .success(false)
                    .build();
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword())
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var token = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .message("Successfully authenticated user.")
                .success(true)
                .build();
    }
}
