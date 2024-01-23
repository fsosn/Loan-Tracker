package com.example.loantracker.user.service;

import com.example.loantracker.user.model.User;
import com.example.loantracker.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<String> getAllUserEmails() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
    }
}
