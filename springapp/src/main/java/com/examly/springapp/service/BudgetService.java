package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.Entity.Budget;
import com.examly.springapp.dto.BudgetSummaryDto;
import com.examly.springapp.Entity.Category;
import com.examly.springapp.repository.BudgetRepository;
import com.examly.springapp.repository.CategoryRepository;

@Service
public class BudgetService {
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    @Autowired
    private CategoryRepository catrepo;
    
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
    
    public Category addCategory(Category category){
        return catrepo.save(category);
    }
    
    public List<Category> getAllCategories(){
        return catrepo.findAll();
    }
    
    public void deleteCategory(Long id){
        catrepo.deleteById(id);
    }
    
    public List<BudgetSummaryDto> getBudgetSummary() {
        List<Category> categories = catrepo.findAll();
        if (categories == null || categories.isEmpty()) {
            return List.of();
        }
        return categories.stream()
            .map(c -> new BudgetSummaryDto(
                c.getCategoryName(),
                c.getBudgetLimit() != null ? c.getBudgetLimit().doubleValue() : 0.0,
                0.0
            ))
            .collect(Collectors.toList());
    }
}
