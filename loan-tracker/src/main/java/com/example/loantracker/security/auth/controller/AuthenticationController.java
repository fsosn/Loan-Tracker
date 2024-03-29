package com.example.loantracker.security.auth.controller;

import com.example.loantracker.security.auth.request.AuthenticationRequest;
import com.example.loantracker.security.auth.request.ChangePasswordRequest;
import com.example.loantracker.security.auth.request.ForgotPasswordRequest;
import com.example.loantracker.security.auth.request.RegisterRequest;
import com.example.loantracker.security.auth.response.AuthenticationResponse;
import com.example.loantracker.security.auth.response.ChangePasswordResponse;
import com.example.loantracker.security.auth.response.RegisterResponse;
import com.example.loantracker.security.auth.service.AuthenticationService;
import com.example.loantracker.security.password_reset.ForgotPasswordService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.auth.base}")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("${api.auth.register}")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("${api.auth.authenticate}")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(authenticationService.authenticate(request, httpServletRequest));
    }

    @PostMapping("${api.auth.change}")
    public ResponseEntity<ChangePasswordResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(authenticationService.changePassword(request));
    }

    @GetMapping("${api.auth.xsrf}")
    public ResponseEntity<Void> getXSRFToken() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestParam String userEmail) {
        forgotPasswordService.sendResetTokenByEmail(userEmail);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ChangePasswordResponse> resetPassword(@RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(authenticationService.forgotPassword(request));
    }
}
