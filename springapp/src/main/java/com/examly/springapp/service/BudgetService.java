package com.examly.springapp.service;

import com.examly.springapp.Entity.Budget;
import com.examly.springapp.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BudgetService {
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }
    
    public List<Budget> getUserBudgets(Long userId) {
        return budgetRepository.findByUser_IdAndIsActiveTrue(userId);
    }
    
    public Budget updateBudget(Budget budget) {
        return budgetRepository.save(budget);
    }
    
    public void deleteBudget(Long id) {
        budgetRepository.deleteById(id);
    }
}