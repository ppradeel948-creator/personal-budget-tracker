package com.examly.springapp.service;

import com.examly.springapp.Entity.Category;
import com.examly.springapp.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    public List<Category> getUserCategories(Long userId) {
        return categoryRepository.findByUser_IdAndIsActiveTrue(userId);
    }
    
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }
}