package com.example.loantracker.login.failed.service;

import com.example.loantracker.login.failed.model.FailedLoginAttempt;
import com.example.loantracker.login.failed.repository.FailedLoginAttemptRepository;
import com.example.loantracker.login.util.LoginUtil;
import com.example.loantracker.security.auth.request.AuthenticationRequest;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class FailedLoginAttemptService {

    private final FailedLoginAttemptRepository repository;
    private final LoginUtil loginUtil;

    public void handleFailedLoginAttempt(
            AuthenticationRequest authenticationRequest,
            HttpServletRequest httpServletRequest) {

        FailedLoginAttempt failedLoginAttempt = FailedLoginAttempt.builder()
                .emailUsed(authenticationRequest.getEmail())
                .ipAddress(loginUtil.getClientIpAddress(httpServletRequest))
                .deviceInfo(httpServletRequest.getHeader("user-agent"))
                .timestamp(LocalDateTime.now())
                .build();

        repository.save(failedLoginAttempt);
    }

    public List<FailedLoginAttempt> getFailedLoginAttemptsByEmail() {
        return repository.findAllByEmailUsed(getCurrentUserEmail());
    }

    private String getCurrentUserEmail() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return userDetails.getUsername();
    }
}
