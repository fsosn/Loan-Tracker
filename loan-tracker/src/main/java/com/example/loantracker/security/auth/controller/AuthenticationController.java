package com.example.loantracker.security.auth.controller;

import com.example.loantracker.security.auth.request.AuthenticationRequest;
import com.example.loantracker.security.auth.request.ChangePasswordRequest;
import com.example.loantracker.security.auth.request.RegisterRequest;
import com.example.loantracker.security.auth.response.AuthenticationResponse;
import com.example.loantracker.security.auth.response.ChangePasswordResponse;
import com.example.loantracker.security.auth.response.RegisterResponse;
import com.example.loantracker.security.auth.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${frontend}", allowCredentials = "true")
@RestController
@RequestMapping("${api.auth.base}")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("${api.auth.register}")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("${api.auth.authenticate}")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("${api.auth.change}")
    public ResponseEntity<ChangePasswordResponse> changePassword(@RequestBody ChangePasswordRequest request) {
        return ResponseEntity.ok(authenticationService.changePassword(request));
    }

    @GetMapping("${api.auth.xsrf}")
    public ResponseEntity<Void> getXSRFToken() {
        return ResponseEntity.ok().build();
    }
}
