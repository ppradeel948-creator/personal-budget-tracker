package com.examly.springapp.Configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    //password encoder
    @Bean
    public static PasswordEncoder passwordEncoder(){
  return new BCryptPasswordEncoder();
}
  //connection between api and application
@Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{    
    //disable CSRF token
  //http.csrf(csrf->csrf.disable()).authorizeRequests((authorize)->authorize.anyReauests().authenticated()).httpBasic(Customizer.withDefaults
  http.csrf(csrf->csrf.disable()).authorizeRequests((authorize)->authorize.anyRequest().authenticated()).httpBasic(Customizer.withDefaults());
  return http.build();
  

}

//verify user and admin details
@Bean
public UserDetailsService userDetailsService(PasswordEncoder encoder){
  UserDetails user=User.builder().username("abc").password(passwordEncoder().encode("abc")).roles("USER").build();
  UserDetails admin=User.builder().username("admin").password(passwordEncoder().encode("admin")).roles("ADMIN").build();
  return new InMemoryUserDetailsManager(user,admin);
}



}
