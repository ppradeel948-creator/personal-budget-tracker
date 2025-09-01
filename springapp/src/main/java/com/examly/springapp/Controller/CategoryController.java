package com.examly.springapp.Controller;

import com.examly.springapp.Entity.Category;
import com.examly.springapp.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Validated
public class CategoryController {

    @Autowired
    private BudgetService budgetService;

    @GetMapping
    public List<Category> getAllCategories() {
        return budgetService.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<Category> addCategory(@Valid @RequestBody Category category) {
        Category savedCategory = budgetService.addCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        budgetService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }

   
}
