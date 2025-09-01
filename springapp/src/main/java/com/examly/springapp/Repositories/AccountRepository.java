package com.examly.springapp.Repositories;




import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.Entity.Account;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(Long userId);
}
