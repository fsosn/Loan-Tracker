package com.example.loantracker.login.ip_tracking;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class IpTrackingService {

    private static final int MAX_ATTEMPTS = 3;
    private static final int BASE_DELAY_SECONDS = 1;
    private static final int MAX_DELAY_MINUTES = 60;

    private IpTrackingRepository ipTrackingRepository;

    public boolean isIpBlocked(String ipAddress) {
        IpTracking ipTracking = ipTrackingRepository.findByIp(ipAddress);
        return ipTracking != null &&
                ipTracking.getFailedAttempts() >= MAX_ATTEMPTS &&
                ipTracking.getLastAttemptTime().isAfter(LocalDateTime.now().minusSeconds(getDynamicDelay(ipTracking.getFailedAttempts())));
    }

    public void updateFailedAttempts(String ipAddress) {
        IpTracking ipTracking = ipTrackingRepository.findByIp(ipAddress);

        if (ipTracking != null) {
            ipTracking.setFailedAttempts(ipTracking.getFailedAttempts() + 1);
            ipTracking.setLastAttemptTime(LocalDateTime.now());
        } else {
            ipTracking = IpTracking.builder()
                    .ip(ipAddress)
                    .failedAttempts(1)
                    .lastAttemptTime(LocalDateTime.now())
                    .build();
        }

        ipTrackingRepository.save(ipTracking);
    }

    public void resetFailedAttempts(String ipAddress) {
        IpTracking ipTracking = ipTrackingRepository.findByIp(ipAddress);

        if (ipTracking != null) {
            ipTrackingRepository.delete(ipTracking);
        }
    }

    private Long getDynamicDelay(int failedAttempts) {
        int delaySeconds = (int) Math.pow(2, failedAttempts - 1) * BASE_DELAY_SECONDS;

        return Math.min(delaySeconds, TimeUnit.MINUTES.toSeconds(MAX_DELAY_MINUTES));
    }
}
