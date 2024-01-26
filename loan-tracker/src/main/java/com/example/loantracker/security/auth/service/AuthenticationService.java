package com.example.loantracker.security.auth.service;

import com.example.loantracker.loansummary.service.LoanSummaryService;
import com.example.loantracker.login.failed.service.FailedLoginAttemptService;
import com.example.loantracker.login.ip_tracking.IpTrackingService;
import com.example.loantracker.login.util.LoginUtil;
import com.example.loantracker.security.auth.request.AuthenticationRequest;
import com.example.loantracker.security.auth.request.ChangePasswordRequest;
import com.example.loantracker.security.auth.request.RegisterRequest;
import com.example.loantracker.security.auth.response.AuthenticationResponse;
import com.example.loantracker.security.auth.response.ChangePasswordResponse;
import com.example.loantracker.security.auth.response.RegisterResponse;
import com.example.loantracker.security.auth.util.CustomPasswordEncoder;
import com.example.loantracker.security.jwt.JwtService;
import com.example.loantracker.user.exception.UserAlreadyRegisteredException;
import com.example.loantracker.user.model.Role;
import com.example.loantracker.user.model.User;
import com.example.loantracker.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final CustomPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final LoanSummaryService loanSummaryService;
    private final FailedLoginAttemptService failedLoginAttemptService;
    private final IpTrackingService ipTrackingService;
    private final LoginUtil loginUtil;

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

    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletRequest httpServletRequest) {
        if (!validatePassword(request.getPassword())) {
            return AuthenticationResponse.builder()
                    .token(null)
                    .message("Password must have 8 letters and" +
                            " contain at least one lowercase letter," +
                            " one uppercase letter, one digit, and one special character")
                    .success(false)
                    .build();
        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String ipAddress = loginUtil.getClientIpAddress(httpServletRequest);

        if (ipTrackingService.isIpBlocked(ipAddress)) {
            return AuthenticationResponse.builder()
                    .token(null)
                    .message("For security reasons, your access is temporarily restricted. " +
                            "Please wait and try again later.")
                    .success(false)
                    .build();
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword())
            );

            userRepository.save(user);
            var token = jwtService.generateToken(user);

            ipTrackingService.resetFailedAttempts(ipAddress);

            return AuthenticationResponse.builder()
                    .token(token)
                    .message("Successfully authenticated user.")
                    .success(true)
                    .build();
        } catch (BadCredentialsException e) {
            failedLoginAttemptService.handleFailedLoginAttempt(request, httpServletRequest);
            ipTrackingService.updateFailedAttempts(ipAddress);

            return AuthenticationResponse.builder()
                    .token(null)
                    .message("Incorrect credentials. Please try again.")
                    .success(false)
                    .build();
        }
    }

    public ChangePasswordResponse changePassword(ChangePasswordRequest request) {
        try {
            String currentUserEmail = getCurrentUserEmail();
            var user = userRepository.findByEmail(currentUserEmail).orElseThrow();

            if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
                return ChangePasswordResponse.builder()
                        .message("Old password is incorrect.")
                        .success(false)
                        .build();
            }

            if (!validatePassword(request.getNewPassword())) {
                return ChangePasswordResponse.builder()
                        .message("New password must have 8 letters and" +
                                " contain at least one lowercase letter," +
                                " one uppercase letter, one digit, and one special character")
                        .success(false)
                        .build();
            }

            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);

            return ChangePasswordResponse.builder()
                    .message("Password changed successfully.")
                    .success(true)
                    .build();
        } catch (Exception e) {
            return ChangePasswordResponse.builder()
                    .message("Failed to change password. Please try again.")
                    .success(false)
                    .build();
        }
    }


    private String getCurrentUserEmail() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return userDetails.getUsername();
    }
}
