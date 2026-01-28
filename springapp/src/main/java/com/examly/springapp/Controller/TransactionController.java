package com.examly.springapp.Controller;

import com.examly.springapp.Entity.Transaction;
import com.examly.springapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000"}, maxAge = 3600)
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER')")
    public ResponseEntity<Transaction> createTransaction(@Valid @RequestBody Transaction transaction) {
        Transaction created = transactionService.createTransaction(transaction);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<List<Transaction>> getUserTransactions() {
        List<Transaction> transactions = transactionService.getUserTransactions(1L);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<String> getTransaction(@PathVariable Long id) {
        return ResponseEntity.ok("Transaction found");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER')")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, 
            @Valid @RequestBody Transaction transaction) {
        transaction.setId(id);
        Transaction updated = transactionService.updateTransaction(transaction);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER')")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok("Transaction deleted successfully");
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<String> searchTransactions() {
        return ResponseEntity.ok("Search results");
    }

    @GetMapping("/analytics/spending")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<String> getSpendingAnalytics() {
        return ResponseEntity.ok("Spending analytics");
    }

    @GetMapping("/analytics/categories")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<String> getCategoryBreakdown() {
        return ResponseEntity.ok("Category breakdown");
    }
}