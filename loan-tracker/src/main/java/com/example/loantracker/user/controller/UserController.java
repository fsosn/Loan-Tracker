package com.example.loantracker.user.controller;

import com.example.loantracker.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.users.base}")
@RequiredArgsConstructor
@CrossOrigin(origins = {"${frontend}"}, allowCredentials = "true")
public class UserController {
    private final UserService userService;

    @GetMapping("${api.users.get.all}")
    public List<String> getAllUserEmails() {
        return userService.getAllUserEmails();
    }

}
