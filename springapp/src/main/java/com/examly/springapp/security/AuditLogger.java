package com.examly.springapp.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@Component
public class AuditLogger {

    private static final Logger logger = LoggerFactory.getLogger(AuditLogger.class);

    public void logLoginAttempt(String username, String ipAddress, boolean success) {
        String status = success ? "SUCCESS" : "FAILED";
        logger.info("LOGIN_ATTEMPT: User={}, IP={}, Status={}, Time={}", 
                   username, ipAddress, status, LocalDateTime.now());
    }

    public void logLogout(String username, String ipAddress) {
        logger.info("LOGOUT: User={}, IP={}, Time={}", 
                   username, ipAddress, LocalDateTime.now());
    }

    public void logPasswordChange(String username, String ipAddress) {
        logger.info("PASSWORD_CHANGE: User={}, IP={}, Time={}", 
                   username, ipAddress, LocalDateTime.now());
    }

    public void logSuspiciousActivity(String username, String activity, String ipAddress) {
        logger.warn("SUSPICIOUS_ACTIVITY: User={}, Activity={}, IP={}, Time={}", 
                   username, activity, ipAddress, LocalDateTime.now());
    }

    public void logDataAccess(String username, String resource, String action, String ipAddress) {
        logger.info("DATA_ACCESS: User={}, Resource={}, Action={}, IP={}, Time={}", 
                   username, resource, action, ipAddress, LocalDateTime.now());
    }

    public String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}