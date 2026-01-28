package com.examly.springapp.Configuration;

import com.examly.springapp.security.JwtAuthenticationEntryPoint;
import com.examly.springapp.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

    private final JwtAuthenticationEntryPoint unauthorizedHandler;

    public WebSecurityConfig(JwtAuthenticationEntryPoint unauthorizedHandler) {
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public JwtAuthenticationFilter authenticationJwtTokenFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8081", "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/public/**").permitAll()
                .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                
                // Admin/Primary User only endpoints
                .antMatchers("/api/admin/**").hasRole("PRIMARY_USER")
                .antMatchers("/api/users/*/delete").hasRole("PRIMARY_USER")
                .antMatchers("/api/budgets/*/delete").hasRole("PRIMARY_USER")
                
                // Financial Advisor specific endpoints
                .antMatchers("/api/advisor/**").hasRole("FINANCIAL_ADVISOR")
                .antMatchers("/api/analytics/advisor/**").hasRole("FINANCIAL_ADVISOR")
                
                // Transaction management - Primary users and family members
                .antMatchers(HttpMethod.POST, "/api/transactions").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER")
                .antMatchers(HttpMethod.PUT, "/api/transactions/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER")
                .antMatchers(HttpMethod.DELETE, "/api/transactions/**").hasRole("PRIMARY_USER")
                .antMatchers(HttpMethod.GET, "/api/transactions/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "FINANCIAL_ADVISOR", "DEPENDENT_USER")
                
                // Budget management
                .antMatchers(HttpMethod.POST, "/api/budgets").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER")
                .antMatchers(HttpMethod.PUT, "/api/budgets/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER")
                .antMatchers(HttpMethod.GET, "/api/budgets/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "FINANCIAL_ADVISOR", "DEPENDENT_USER")
                
                // Goal management
                .antMatchers(HttpMethod.POST, "/api/goals").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "DEPENDENT_USER")
                .antMatchers(HttpMethod.PUT, "/api/goals/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "DEPENDENT_USER")
                .antMatchers(HttpMethod.GET, "/api/goals/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "FINANCIAL_ADVISOR", "DEPENDENT_USER")
                
                // Analytics and reports - Read access for advisors
                .antMatchers("/api/analytics/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "FINANCIAL_ADVISOR")
                .antMatchers("/api/reports/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER", "FINANCIAL_ADVISOR")
                
                // Category management
                .antMatchers(HttpMethod.POST, "/api/categories").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER")
                .antMatchers(HttpMethod.PUT, "/api/categories/**").hasAnyRole("PRIMARY_USER", "FAMILY_MEMBER")
                .antMatchers(HttpMethod.GET, "/api/categories/**").authenticated()
                
                // Notifications
                .antMatchers("/api/notifications/**").authenticated()
                
                // All other requests require authentication
                .anyRequest().authenticated()
            );

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
