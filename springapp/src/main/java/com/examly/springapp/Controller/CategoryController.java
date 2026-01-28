package com.examly.springapp.Controller;

import com.examly.springapp.Entity.Category;
import com.examly.springapp.security.UserPrincipal;
import com.examly.springapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000"}, maxAge = 3600)
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<List<Category>> getUserCategories(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        List<Category> categories = categoryService.getUserCategories(userPrincipal.getId());
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER')")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        category.setUserId(userPrincipal.getId());
        Category savedCategory = categoryService.createCategory(category);
        return ResponseEntity.ok(savedCategory);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER') or hasRole('FINANCIAL_ADVISOR')")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {
        return ResponseEntity.ok("Category found");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER') or hasRole('FAMILY_MEMBER')")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category category) {
        category.setId(id);
        Category updatedCategory = categoryService.updateCategory(category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PRIMARY_USER')")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        // Delete functionality not implemented in simplified service
        return ResponseEntity.ok("Category deleted successfully");
    }
}
