package com.examly.springapp.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.BudgetSummaryDto;
import com.examly.springapp.Entity.Category;
import com.examly.springapp.service.BudgetService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private BudgetService service;

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        return ResponseEntity.ok(service.addCategory(category));
    }

    @GetMapping
    public ResponseEntity<List<Category>> fetchAllCategory() {
        return ResponseEntity.ok(service.getAllCategories());
    }

    @GetMapping("/summary")
    public ResponseEntity<List<BudgetSummaryDto>> fetchAllBudgetSummary() {
        return ResponseEntity.ok(service.getBudgetSummary());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        service.deleteCategory(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteWithoutId() {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
    }

    @GetMapping("/authentication")
    public String loginVerify(Authentication authentication) {
        String username = authentication.getName();
        return "welcome to " + username + " to SKCET";
    }
}
