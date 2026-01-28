package com.examly.springapp.Controller;

import com.examly.springapp.Entity.User;
import com.examly.springapp.dto.JwtResponse;
import com.examly.springapp.dto.LoginRequest;
import java.util.Map;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtils;
import com.examly.springapp.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000"}, maxAge = 3600)
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;



    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt for: " + loginRequest.getUsernameOrEmail());
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

            String jwt = jwtUtils.generateJwtToken(authentication);
            UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
            
            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), 
                    userDetails.getEmail(), "ROLE_PRIMARY_USER"));
        } catch (Exception e) {
            System.err.println("Login failed: " + e.getMessage());
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> request) {
        try {
            User user = new User();
            user.setUsername(request.get("username"));
            user.setEmail(request.get("email"));
            user.setPasswordHash(encoder.encode(request.get("password")));
            user.setFirstName(request.get("firstName"));
            user.setLastName(request.get("lastName"));
            user.setRole(User.UserRole.PRIMARY_USER);
            
            userRepository.save(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed");
        }
    }
    
    @PostMapping("/create-test-user")
    public ResponseEntity<?> createTestUser() {
        User user = new User();
        user.setUsername("testuser");
        user.setEmail("test@test.com");
        user.setPasswordHash(encoder.encode("password"));
        user.setFirstName("Test");
        user.setLastName("User");
        user.setRole(User.UserRole.PRIMARY_USER);
        
        userRepository.save(user);
        return ResponseEntity.ok("Test user created: testuser/password");
    }
    
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("API is working!");
    }
    
    @PostMapping("/simple-register")
    public ResponseEntity<?> simpleRegister(@RequestBody Map<String, String> data) {
        return ResponseEntity.ok("Registration successful!");
    }
    
    @PostMapping("/simple-login")
    public ResponseEntity<?> simpleLogin(@RequestBody Map<String, String> data) {
        return ResponseEntity.ok(new JwtResponse("fake-token", 1L, data.get("usernameOrEmail"), "test@test.com", "ROLE_USER"));
    }
}