package com.examly.springapp.Controller;

import com.examly.springapp.Entity.User;
import com.examly.springapp.security.UserPrincipal;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000"}, maxAge = 3600)
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok("User profile");
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateUserProfile(@Valid @RequestBody User user, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        user.setId(userPrincipal.getId());
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok("User deactivated");
    }
}