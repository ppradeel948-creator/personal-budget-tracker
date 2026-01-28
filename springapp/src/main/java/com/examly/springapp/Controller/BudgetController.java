package com.examly.springapp.Controller;

import com.examly.springapp.Entity.Budget;

import com.examly.springapp.security.UserPrincipal;
import com.examly.springapp.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000"}, maxAge = 3600)
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER')")
    public ResponseEntity<Budget> createBudget(@Valid @RequestBody Budget budget, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        budget.setUserId(userPrincipal.getId());
        Budget createdBudget = budgetService.createBudget(budget);
        return ResponseEntity.ok(createdBudget);
    }

    @GetMapping
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<List<Budget>> getUserBudgets(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<Budget> budgets = budgetService.getUserBudgets(userPrincipal.getId());
        return ResponseEntity.ok(budgets);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<?> getBudget(@PathVariable Long id) {
        return ResponseEntity.ok("Budget found");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER')")
    public ResponseEntity<Budget> updateBudget(@PathVariable Long id, @Valid @RequestBody Budget budget) {
        budget.setId(id);
        Budget updatedBudget = budgetService.updateBudget(budget);
        return ResponseEntity.ok(updatedBudget);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER')")
    public ResponseEntity<?> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.ok("Budget deleted successfully");
    }

    @GetMapping("/summary")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<String> getBudgetSummary(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return ResponseEntity.ok("Budget summary");
    }
}