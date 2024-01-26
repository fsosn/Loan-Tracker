package com.example.loantracker.login.ip_tracking;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IpTrackingRepository extends JpaRepository<IpTracking, Long> {
    IpTracking findByIp(String ipAddress);
}
