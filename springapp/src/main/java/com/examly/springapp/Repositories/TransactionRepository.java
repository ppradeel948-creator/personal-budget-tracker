package com.examly.springapp.Repositories;



import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.Entity.Transaction;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountId(Long accountId);
}