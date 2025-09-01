package com.examly.springapp.Repositories;



import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}