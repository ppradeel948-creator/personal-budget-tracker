package com.examly.springapp.service;

import com.examly.springapp.Entity.Category;
import com.examly.springapp.dto.BudgetSummaryDto;
import com.examly.springapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public List<BudgetSummaryDto> getBudgetSummary() {
        return categoryRepository.findAll().stream()
                .map(category -> new BudgetSummaryDto(
                        category.getCategoryName(),
                        category.getAllocatedAmount(),
                        category.getSpentAmount(),
                        category.getAllocatedAmount() - category.getSpentAmount()))
                .collect(Collectors.toList());
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
