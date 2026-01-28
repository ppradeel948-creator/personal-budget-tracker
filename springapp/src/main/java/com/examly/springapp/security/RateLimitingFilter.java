package com.examly.springapp.security;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final ConcurrentHashMap<String, AtomicInteger> requestCounts = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<String, Long> requestTimes = new ConcurrentHashMap<>();
    
    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final long TIME_WINDOW = 60000; // 1 minute

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String clientIp = getClientIP(request);
        String key = clientIp + ":" + request.getRequestURI();
        
        if (isRateLimited(key)) {
            response.setStatus(429); // Too Many Requests
            response.getWriter().write("Rate limit exceeded. Please try again later.");
            return;
        }
        
        filterChain.doFilter(request, response);
    }

    private boolean isRateLimited(String key) {
        long currentTime = System.currentTimeMillis();
        
        requestTimes.compute(key, (k, lastTime) -> {
            if (lastTime == null || currentTime - lastTime > TIME_WINDOW) {
                requestCounts.put(k, new AtomicInteger(1));
                return currentTime;
            }
            return lastTime;
        });
        
        AtomicInteger count = requestCounts.get(key);
        if (count != null && count.incrementAndGet() > MAX_REQUESTS_PER_MINUTE) {
            return true;
        }
        
        return false;
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}