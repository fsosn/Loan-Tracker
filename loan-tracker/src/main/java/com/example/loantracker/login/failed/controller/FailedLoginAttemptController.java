package com.example.loantracker.login.failed.controller;

import com.example.loantracker.login.failed.model.FailedLoginAttempt;
import com.example.loantracker.login.failed.service.FailedLoginAttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.failed-login.base}")
public class FailedLoginAttemptController {

    private final FailedLoginAttemptService failedLoginAttemptService;

    @GetMapping
    public ResponseEntity<List<FailedLoginAttempt>> getFailedLoginAttemptsByEmail() {
        List<FailedLoginAttempt> failedAttempts = failedLoginAttemptService.getFailedLoginAttemptsByEmail();
        return ResponseEntity.ok(failedAttempts);
    }
}
