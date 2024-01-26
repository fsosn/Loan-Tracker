package com.example.loantracker.login.util;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class LoginUtil {
    public String getClientIpAddress(HttpServletRequest httpServletRequest) {
        String[] headersToCheck = {
                "x-forwarded-for",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_X_FORWARDED_FOR",
                "HTTP_X_FORWARDED",
                "HTTP_X_CLUSTER_CLIENT_IP",
                "HTTP_CLIENT_IP",
                "HTTP_FORWARDED_FOR",
                "HTTP_FORWARDED"
        };

        String clientIp = null;

        for (String header : headersToCheck) {
            clientIp = httpServletRequest.getHeader(header);

            if (clientIp != null && !clientIp.isEmpty() && !"unknown".equalsIgnoreCase(clientIp)) {
                break;
            }
        }

        return (clientIp != null && !clientIp.isEmpty() && !"unknown".equalsIgnoreCase(clientIp)) ?
                clientIp : httpServletRequest.getRemoteAddr();
    }
}
