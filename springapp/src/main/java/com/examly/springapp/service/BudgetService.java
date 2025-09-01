package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.BudgetSummaryDto;
import com.examly.springapp.model.Category;
import com.examly.springapp.repository.CategoryRepository;
@Service
public class BudgetService {
  @Autowired
  CategoryRepository catrepo;
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
    return List.of(); // return an empty list instead of null
  }
  return categories.stream()
      .map(c -> new BudgetSummaryDto(
          c.getCategoryName(),
          (double)c.getAllocatedAmount(),
          0.0
      ))
      .collect(Collectors.toList());
}
}
