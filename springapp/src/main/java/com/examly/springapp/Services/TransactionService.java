package com.examly.springapp.Services;



import org.springframework.stereotype.Service;

import com.examly.springapp.Entity.Transaction;
import com.examly.springapp.Repositories.TransactionRepository;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}