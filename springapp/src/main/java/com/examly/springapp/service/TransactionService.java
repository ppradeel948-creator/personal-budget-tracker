package com.examly.springapp.service;

import com.examly.springapp.Entity.Transaction;
import com.examly.springapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
    
    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
    
    public Transaction updateTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
    
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}