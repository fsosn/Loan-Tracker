package com.example.loantracker.login.failed.repository;

import com.example.loantracker.login.failed.model.FailedLoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FailedLoginAttemptRepository extends JpaRepository<FailedLoginAttempt, Long> {
}
