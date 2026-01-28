package com.examly.springapp.security;

import com.examly.springapp.Entity.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(usernameOrEmail)
            .orElse(userRepository.findByEmail(usernameOrEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrEmail)));
        
        return UserPrincipal.create(user);
    }
}